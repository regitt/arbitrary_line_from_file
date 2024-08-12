export class ConfigError extends Error {
    constructor(args: string | undefined){
        super(args);
        this.name = "ConfigError"
    }
}