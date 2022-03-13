import express from "express";
import bodyParser from "body-parser";
import https from "https";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;

//Enable https
const secureServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, '../cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert', 'cert.pem'))
}, app);

//Initialize Request Data Type
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));

//Intialize Routers
import indexRouter from "./routes/index-routes";
import imageRouter from "./routes/image-routes";

//Use Routers
app.use('/', indexRouter);
app.use('/image', imageRouter);

secureServer.listen(port, () => console.log(`Navigate to https://localhost:${port} to view server`));