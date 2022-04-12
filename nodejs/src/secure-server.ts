import { secureServer } from "./app";
import logger from "./logger";

const port = 3000;
secureServer.listen(port, () => {
    logger.info(`Navigate to https://localhost:${port} to view server`);
    logger.info(`View the API Endpoint documentation here: https://localhost:${port}/api-docs`);
});