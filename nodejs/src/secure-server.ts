import https from "https";
import fs from "fs";
import path from "path";
import { app } from "./app";
import logger from "./logger";

//Enable https
const secureServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, "../cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "../cert", "cert.pem"))
}, app);

const port = 3000;
secureServer.listen(port, () => {
    logger.info(`Navigate to https://localhost:${port} to view server`);
    logger.info(`View the API Endpoint documentation here: https://localhost:${port}/api-docs`);
});