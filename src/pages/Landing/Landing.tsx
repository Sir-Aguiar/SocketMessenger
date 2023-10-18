import React from "react";
import styles from "./Landing.module.css";
import { FaUserLock, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Landing: React.FC = () => {
  const navigate = useNavigate();

  const goClient = () => navigate("client");
  const goAdmin = () => navigate("admin");

  return (
    <div className={styles.main}>
      <h1 className="text-xl font-bold">Escolha seu tipo de usuário</h1>
      <div className={styles.types}>
        <div className={styles.type} onClick={goClient}>
          <FaUsers />
          <span>Cliente</span>
        </div>
        <div className={styles.type} onClick={goAdmin}>
          <FaUserLock />
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
