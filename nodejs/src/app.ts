import express from "express";
import bodyParser from "body-parser";

const app = express();

//Initialize Request Data Type
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));

//Intialize Routers
import indexRouter from "./routes/index-routes";
import imageRouter from "./routes/image-routes";

//Use Routers
app.use('/', indexRouter);
app.use('/image', imageRouter);

const port = 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));