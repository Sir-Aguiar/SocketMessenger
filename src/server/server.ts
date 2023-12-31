import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "ws";

import handleConnection from "./socket-events/connect";

const ExpressApp = express();
const HttpServer = createServer(ExpressApp);
const WebSocketServer = new Server({ server: HttpServer });

ExpressApp.get("/", (req, res) => {
  res.send("This is working");
});

ExpressApp.use(cors({ origin: "*" }));

WebSocketServer.on("connection", handleConnection);
export { ExpressApp, HttpServer, WebSocketServer };
