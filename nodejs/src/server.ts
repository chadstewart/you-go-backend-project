import { app } from "./app";

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(
`Server is live on ${port}

View the API Endpoint documentation by going to /api-docs
`
));