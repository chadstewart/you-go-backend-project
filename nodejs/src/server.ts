import { secureServer } from "./app";

const port = 3000;
secureServer.listen(port, () => console.log(`Navigate to https://localhost:${port} to view server`));