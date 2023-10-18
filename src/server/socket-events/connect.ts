import { randomUUID } from "crypto";
import { SocketActions } from "../../@types";
import { EmitMessage } from "./emit-message";

let ADMIN_MESSAGE: string | null = null;
let CLIENTS: WebSocket[] = [];

interface ConnectionResponse {
  action: SocketActions;
  sessionID: string;
  ADMIN_MESSAGE: string | null;
}

function handleConnection(socket: WebSocket) {
  const connectionResponse: ConnectionResponse = { action: "CONNECT", sessionID: randomUUID(), ADMIN_MESSAGE };

  CLIENTS.push(socket);

  socket.onmessage = (event) => {
    const { action, message } = JSON.parse(event.data);

    if (action === "EMIT-MESSAGE") {
      ADMIN_MESSAGE = message;
      EmitMessage(ADMIN_MESSAGE, CLIENTS);
      return;
    }
  };

  socket.onclose = (event) => {
    CLIENTS = CLIENTS.filter((client) => client !== socket);
  };
  
  socket.send(JSON.stringify(connectionResponse));
}

export default handleConnection;
