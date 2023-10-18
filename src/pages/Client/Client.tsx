import React, { useEffect, useState } from "react";
import styles from "./Client.module.css";
import { connectToServer } from "../../services/socket";

const Client: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const webSocket = connectToServer();
    webSocket.addEventListener("message", (event: any) => {
      const response = JSON.parse(event.data);
      setMessage(response.ADMIN_MESSAGE);
    });
  }, []);

  return (
    <div className={styles.main}>
      {message && (
        <>
          <h1>{message}</h1>
          <span>- Admin</span>
        </>
      )}
    </div>
  );
};

export default Client;
