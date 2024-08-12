import { createReadStream, existsSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { FileIndexer } from './FileIndexer';
import { FileReader } from './FileReader';
import { FileError } from "./FileError";
import events from 'events';

export class FileHandler {

    private _filePath: string;
    private _fileIndexer: FileIndexer;
    private _fileReader: FileReader;
    private _indexFileName: string = './indexes.json';

    constructor(filePath: string, lineIndex: number) {
        this._filePath = filePath;
        this._fileIndexer = new FileIndexer();
        this._fileReader = new FileReader(lineIndex);
    }

    public async index(): Promise<void> {
        const readableStream = createReadStream(this._filePath);
        readableStream.on('data', this.onIndexData.bind(this));
        readableStream.on('end', this.onIndexEnd.bind(this));
        readableStream.on('error', this.onError);
        await events.once(readableStream, 'end');
    }

    public async readArbitraryLine(): Promise<string> {
        const readOptions = this._fileReader.getOptions();
        const readableStream = createReadStream(this._filePath, readOptions);
        readableStream.on('error', this.onError);

        const readLine = createInterface(readableStream);
        readLine.on('line', this.onReadLineLine.bind(this));
        readLine.on('error', this.onError);

        await events.once(readLine, 'close');

        return this._fileReader.getLine();
    }

    public isFileIndexed(): boolean {
        const isIndexFilPresent: boolean = existsSync(this._indexFileName);
        return isIndexFilPresent;
    }

    private onIndexData(chunk: Buffer) {
        this._fileIndexer.index(chunk.toString());
    }

    private onIndexEnd() {
        this._fileIndexer.finishIndexing();
    }

    private onReadLineLine(line: any) {
        this._fileReader.readLines(line);
    }

    private onError(error: Error) {
        throw new FileError(error.message);
    }
}