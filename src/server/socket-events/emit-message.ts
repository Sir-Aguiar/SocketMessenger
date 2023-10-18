import { SocketActions } from "../../@types";

interface EmitMessageResponse {
  action: SocketActions;
  ADMIN_MESSAGE: string | null;
}

export const EmitMessage = (message: string | null, CLIENTS: WebSocket[]) => {
  const emitMessageResponse: EmitMessageResponse = { action: "NEW-MESSAGE", ADMIN_MESSAGE: message };

  CLIENTS.forEach((CLIENT) => {
    if (CLIENT.readyState) {
      CLIENT.send(JSON.stringify(emitMessageResponse));
    }
  });
};
