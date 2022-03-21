import express from "express";
import bodyParser from "body-parser";
import https from "https";
import fs from "fs";
import path from "path";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

export const app = express();

//Initialize Swagger Doc Server
const swaggerDocument = YAML.load('./src/docs/api-spec.yaml');
app.use('/api-docs', swaggerUi.serve,   swaggerUi.setup(swaggerDocument));

//Initialize Request Data Type
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));

//Intialize Routers
import indexRouter from "./routes/index-routes";
import imageRouter from "./routes/image-routes";

//Use Routers
app.use('/', indexRouter);
app.use('/image', imageRouter);

//Enable https
export const secureServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, '../cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert', 'cert.pem'))
}, app);