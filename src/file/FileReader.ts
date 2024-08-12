import { readFileSync } from 'node:fs';
import { FileIndex } from "./FileIndexer";

interface ReadableStreamOptions {
    start: number;
    end: number;
}

export class FileReader{

    private _lineText: string = '';
    private _lineCount: number = 0;
    private _lineIndex: number;

    constructor(lineIndex: number) {
        this._lineIndex = lineIndex;
    }

    public readLines (line: any) {
        if (this._lineCount === (this._lineIndex - 1)) {
            this._lineText = line;
        }
        this._lineCount++;
    }

    public getLine() {
        return this._lineText;
    }

    public getOptions(): ReadableStreamOptions {
        const indexesRaw: any = readFileSync('./indexes.json', 'utf8');
        const indexes: FileIndex[] = JSON.parse(indexesRaw);

        let bytes = 0;
        let bytesOffset = 0;

        for (const index of indexes) {
            if (this._lineIndex > index.lines) {
                this._lineIndex = this._lineIndex - index.lines;
                bytes = bytes + index.bytes;
            } else {
                bytesOffset = index.bytes;
                break;
            } 
        }
        return {
            start: bytes,
            end: bytes + bytesOffset,
        }
    }
}