export class ChunkObject {

    private _numberOflines: number = 0;
    private _numberOfBytes: number = 0;
    private _leftover: string = '';
    private _chunk: string;
    

    constructor(chunk: string) {
        this._chunk = chunk;
    }

    public process() {
        const lines = this._chunk.split('\n');

        if (lines.length > 1) {
            this._leftover = lines.pop() as string;
        }
        
        this._numberOflines = lines.length;
        this._numberOfBytes = this.countBytesWithoutLeftover(this._chunk, this._leftover);
    }

    public getNumberOfLine() {
        return this._numberOflines;
    }

    public getNumberOfBytes() {
        return this._numberOfBytes;
    }

    public getLeftover() {
        return this._leftover;
    }

    private countBytesWithoutLeftover(chunk: string, leftover: string) {
        return Buffer.byteLength(chunk) - Buffer.byteLength(leftover);
    }
}