import express from "express";
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
import v1ImageRouter from "./routes/v1/image-routes";

//Use Routers
app.use("/", indexRouter);
app.use("/v1/image", v1ImageRouter);

//Intitialize Image Logger
app.use(imageLogger);