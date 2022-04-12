import { app } from "./app";
import logger from "./logger";

const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`Server is live on ${port}`);
    logger.info(`View the API Endpoint documentation by going to /api-docs`);
});