import React from "react";

import style from "../assets/style/login.module.css";


const Login1 = () => {
  
  
  return (
    <div className={style.container}>
      <div className={style.container1}>
        <h3 style={{ display: "flex" }}>
          <img
            style={{ width: "23px" }}
            src="https://img.icons8.com/color/50/000000/google-logo.png"
          />{" "}
          <a
            href="http://localhost:9000/auth/google"
            style={{ textDecoration: "none", color: "#b46868" }}
          >
            Login with Google
          </a>
        </h3>
      </div>
    </div>
  );
};

export default Login1;
