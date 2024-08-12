export interface Config {
    path: string;
    index: number;
}

export abstract class Configuration {
    public abstract validate(): void;
    public abstract getConfig(): Config;
}