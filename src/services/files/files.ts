import Config from "../../config/config";
import { NoParamCallback } from "fs";
import { Logger } from "pino";

class Files {
  constructor(private readonly logger: Logger) {}

  private fs = require("fs");

  public async write(filename: string, content: string): Promise<void> {
    const log = this.logger;
    this.fs.writeFile(
      Config.services.files.folder + "/" + filename,
      content,
      function (err: NoParamCallback) {
        if (err) {
          return log.error("An error occurred", err);
        }
        log.debug("File created!");
      },
    );

    log.debug(`File "${filename}" written to ${filename}`);
  }
}

export default Files;
