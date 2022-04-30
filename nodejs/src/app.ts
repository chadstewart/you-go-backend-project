import express from "express";
import https from "https";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import notDefined from "./middlewares/not-defined";
import imageLogger from "./middlewares/image-logger";

export const app = express();

//Initialize Swagger Doc Server
const swaggerOptions = {
    swaggerOptions: {
        docExpansion: true
    }
};

const swaggerDocument = YAML.load(path.join(__dirname, "../api-docs", "api-spec.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

//Initialize Request Data Type
app.use(express.json({ limit: "10mb" }));

//Initalize NotDefined
app.use(notDefined);

//Intialize Routers
import indexRouter from "./routes/index-routes";
import imageRouter from "./routes/image-routes";

//Use Routers
app.use("/", indexRouter);
app.use("/image", imageRouter);

//Intitialize Image Logger
app.use(imageLogger);

//Enable https
export const secureServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, "../cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "../cert", "cert.pem"))
}, app);