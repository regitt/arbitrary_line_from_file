import { CmdConfiguration } from "./config/CmdConfiguration";
import { Config, Configuration } from "./config/Configuration";
import { FileInterface } from "./file/FileInterface";

const configInitializer: Configuration = new CmdConfiguration();
let config: Config;

try {
    configInitializer.validate();
    config = configInitializer.getConfig();
} catch (error: unknown) {
    console.error((error as Error).message);
    process.exit(1);
}

(async () => {
    try {
        const fileInterface: FileInterface = new FileInterface(config.path, config.index);

        console.log('Indexing file ...');
        await fileInterface.index();

        console.log('Reading line ...');
        const line = await fileInterface.readLine();
        console.log('Arbitrary Line: ', line);

    } catch (error: unknown) {
        console.error((error as Error).message);
        process.exit(1);
    }
})();
