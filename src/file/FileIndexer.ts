import { writeFileSync } from "node:fs";
import { ChunkObject } from "./ChunkObject";
import { FileError } from "./FileError";

export interface FileIndex {
    index: number;
    bytes: number;
    lines: number;
}

interface LineMetadata {
    lines: number;
    bytes: number;
}

export class FileIndexer {

    private _numberOfChunksInOneGroup: number = 1000;
    private _chunkCounter: number = 0;
    private _indexNumber: number = 1;
    private _numberOfLines: number = 0;
    private _numberOfBytes: number = 0;
    private _indexes: FileIndex[] = [];
    private _leftover: string = '';

    public index(chunk: string) {
        const chunkWithLeftover: string = this._leftover + chunk;
        this._leftover = '';

        this.processChunk(chunkWithLeftover);

        if (this._chunkCounter === this._numberOfChunksInOneGroup) {
            console.log('Index #', this._indexNumber, ' created');
            this.pushNewIndex();
        }
    }

    public finishIndexing() {
        if (this._leftover !== '') {
            this.processChunk(this._leftover);
        }

        if (this._chunkCounter > 0) {
            this.pushNewIndex();
        }

        this.createIndexFile();
    }

    private processChunk(chunk: string) {
        const partialIndexCounters: LineMetadata = this.getChunkMetadata(chunk);
        this.increaseFileIndexCounters(partialIndexCounters);
    }

    private getChunkMetadata(chunk: string): LineMetadata {
        const chunkObject = new ChunkObject(chunk);

        chunkObject.process();
        this._leftover = chunkObject.getLeftover();
        
        return {
            lines: chunkObject.getNumberOfLine(),
            bytes: chunkObject.getNumberOfBytes(),
        }
    }

    private createIndexFile() {
        try {
            writeFileSync('./indexes.json', JSON.stringify(this._indexes));
        } catch (e) {
            throw new FileError('Indexes file has not been created.')
        }
    }

    private resetFileIndexCounters() {
        this._chunkCounter = 0;
        this._numberOfLines = 0;
        this._numberOfBytes = 0;
    }

    private increaseFileIndexCounters(partialIndexCounters: LineMetadata) {
        this._chunkCounter++;
        this._numberOfBytes = this._numberOfBytes + partialIndexCounters.bytes;
        this._numberOfLines = this._numberOfLines + partialIndexCounters.lines;
    }

    private pushNewIndex() {
        this._indexes.push({
            index: this._indexNumber,
            bytes: this._numberOfBytes,
            lines: this._numberOfLines,
        });
        this._indexNumber++;
        this.resetFileIndexCounters();
    }
}