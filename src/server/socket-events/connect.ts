import { randomUUID } from "crypto";
import { IncomingMessage } from "http";
import { SocketActions } from "../../@types";

let ADMIN_MESSAGE: string | null = null;
const CLIENTS: WebSocket[] = [];

interface ConnectionResponse {
  action: SocketActions;
  sessionID: string;
  ADMIN_MESSAGE: string | null;
}

interface EmitMessageResponse {
  action: SocketActions;
  ADMIN_MESSAGE: string | null;
}

function handleConnection(socket: WebSocket, request: IncomingMessage) {
  const connectionResponse: ConnectionResponse = { action: "CONNECT", sessionID: randomUUID(), ADMIN_MESSAGE };

  CLIENTS.push(socket);

  socket.onmessage = (event) => {
    const { action, message } = JSON.parse(event.data);
    console.log();
    switch (action) {
      case "EMIT-MESSAGE":
        ADMIN_MESSAGE = message;
        console.log(`Mensagem emitida: ${ADMIN_MESSAGE}`);
        const emitMessageResponse: EmitMessageResponse = { action: "NEW-MESSAGE", ADMIN_MESSAGE };

        CLIENTS.forEach((CLIENT) => {
          CLIENT.send(JSON.stringify(emitMessageResponse));
        });
        break;
      default:
        console.log("Action não esperada", event.data);
    }
  };

  socket.send(JSON.stringify(connectionResponse));
}

export default handleConnection;
