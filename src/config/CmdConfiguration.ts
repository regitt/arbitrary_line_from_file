import { argv } from 'node:process';
import { ConfigError } from './ConfigError';
import { Config, Configuration } from './Configuration';

interface CmdConfigObject {
    name: string;
    value: string;
}

export class CmdConfiguration implements Configuration {

    private _path: CmdConfigObject;
    private _index: CmdConfigObject;
    private _isConfigValid: boolean = false;

    constructor () {
        this._path = {
            name: argv[2],
            value: argv[3]
        }

        this._index = {
            name: argv[4],
            value: argv[5]
        }
    }

    public getConfig(): Config {
        if (!this._isConfigValid) {
            throw new ConfigError('Configuration is not valid');
        }

        return {
            path: this._path.value,
            index: Number(this._index.value),
        };
    }

    public validate() {
        try {
            this.validatePath();
            this.validateIndex();
            this._isConfigValid = true;
        } catch(error: unknown) {
            throw error;
        }
    }

    // Privte methods should be cleaned. There is repeating code
    private validatePath() {
        this.validatePathName();
        this.validatePathValue();
    }

    private validateIndex() {
        this.validateIndexName();
        this.validateIndexValue();
    }

    private validatePathName() {
        if (this._path.name !== '--path' && this._path.name !== '-p') {
            throw new ConfigError(
                'CommandLine argument --path/-p has not been specified.\n' +
                '--path/-p commandLine must be specified as a first argument'
            );
        }
    }

    private validatePathValue() {
        if (this._path.value === undefined) {
            throw new ConfigError(
                'CommandLine argument --path/-p has no value.\n' +
                'Specify path to the file for this argument.'
            );
        }
    }

    private validateIndexName() {
        if (this._index.name !== '--index' && this._index.name !== '-i') {
            throw new ConfigError(
                'CommandLine argument --index/-i has not been specified.\n' +
                '--index/-i commandLine must be specified as a second argument'
            );
        }
    }

    private validateIndexValue() {
        if (this._index.value === undefined) {
            throw new ConfigError(
                'CommandLine argument --index/-i has no value.\n' +
                'Specify index of the line that will be read.'
            );
        }

        if (isNaN(this._index.value as unknown as number)) {
            throw new ConfigError(
                'CommandLine argument --index/-i value is not a number.'
            );
        }
    }
}