import { FileError } from "./FileError";
import { FileHandler } from "./FileHandler";

export class FileInterface {

    private _fileHandler: FileHandler;

    constructor(filepath: string, lineIndex: number) {
        this._fileHandler = new FileHandler(filepath, lineIndex);
    }

    public async index() {
        if (!this._fileHandler.isFileIndexed()) {
            await this._fileHandler.index();
        } else {
            console.log('File has been already indexed. See indexes.json file');
        }
    }

    public async readLine(): Promise<string> {
        if (!this._fileHandler.isFileIndexed()) {
            throw new FileError('File has not been indexed');
        }

        return await this._fileHandler.readArbitraryLine();
    }
}