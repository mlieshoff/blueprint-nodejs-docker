import Config from "../config";
import {NoParamCallback} from "fs";

class Files {

    private fs = require('fs');

    public async write(filename: string, content: string): Promise<void> {
        this.fs.writeFile(Config.folder + "/" + filename, content, function(err: NoParamCallback) {
            if (err) {
                return console.error(err);
            }
            console.log("File created!");
        });

        console.log(`File "${filename}" written to ${filename}`);
    }

}

export default Files;
