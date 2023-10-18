import React, { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { connectToServer } from "../../services/socket";

const Admin: React.FC = () => {
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isWrong, setWrong] = useState(false);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket>();

  const verify = () => {
    if (adminPassword !== "123456") {
      setWrong(true);
      return;
    }
    setWrong(false);
    setIsAdmin(true);
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    socket!.send(JSON.stringify({ action: "EMIT-MESSAGE", message }));
  };

  useEffect(() => {
    if (isAdmin) {
      setSocket(connectToServer());
    }
  }, [isAdmin]);

  return (
    <div className={styles.main}>
      {isAdmin ? (
        <form onSubmit={sendMessage} className="w-[300px] flex flex-col items-end gap-2">
          <textarea
            placeholder="Mensagem"
            className="w-full"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            maxLength={50}
            required
          />
          <button className="w-1/2 bg-blue-500 py-2 text-sm font-semibold rounded-sm" type="submit">
            Enviar
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <input
            type="password"
            placeholder="Chave"
            value={adminPassword}
            onChange={(e) => {
              setAdminPassword(e.target.value);
            }}
          />
          <button className={`hover:underline underline-offset-2 ${isWrong && "text-red-500"}`} onClick={verify}>
            Autorizar
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;
