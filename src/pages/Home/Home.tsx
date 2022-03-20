import React from "react";
import "./Home.styles.css";

export const Home = () => {
  return (
    <div className="container">
      <p className="header">Free notes for every students</p>
      <p className="sub-title">
        Upload your notes and see the other students notes
      </p>
      <img src={require("../../assets/homepage.png")} alt="Home Page" />
    </div>
  );
};
