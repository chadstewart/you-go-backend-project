import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//Initialize Request Data Type
app.use(express.json());
app.use(bodyParser.json());

//Intialize Routers
import indexRouter from "./routes/index";

//Use Routers
app.use('/', indexRouter);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));