export class FileError extends Error {
    constructor(args: string | undefined){
        super(args);
        this.name = "FileError"
    }
}