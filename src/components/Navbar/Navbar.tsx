import React from "react";
import "./Navbar.styles.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <div className="logo">
          <img src={require("../../assets/logo.png")} alt="Notebase Logo" />
        </div>
        <p className="notebase-title">Notebase</p>
      </div>
      <div className="routes">
        <p className="route">About us</p>
        <p className="route">Team</p>
        <div className="login-button">
          <p className="login">Login</p>
        </div>
      </div>
    </nav>
  );
};
