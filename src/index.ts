import "dotenv/config";
import { HttpServer } from "./server/server";

const PORT = process.env.SERVER_PORT || 8080;

HttpServer.listen(PORT, () => console.log(`http://localhost:${PORT}`));
