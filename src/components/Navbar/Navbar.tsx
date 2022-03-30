import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { VscDebugBreakpointLog } from "react-icons/vsc";

import { State } from "../../Interfaces/State";
import { requestLogin } from "../../rxutils/actions";
import "./Navbar.styles.css";

export const Navbar = () => {
  const [click, setClick] = useState<boolean>(false);
  const navigate = useNavigate();
  const { student } = useSelector((state: State) => state.auth);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const handleClick = () => setClick(!click);

  const onLogin = async () => {
    dispatch(requestLogin({ username, password }, navigateMain));
  };

  const navigateMain = useCallback(() => {
    navigate("/main");
  }, [navigate]);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <div className="logo-wrapper">
          <img
            src={require("../../assets/logo.png")}
            alt="Notebase Logo"
            className="logo"
          />
        </div>
        <p>Notebase</p>
      </Link>
      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"} />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <Link to="/" className="nav-links">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-links">
            Notes
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-links">
            Contact
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-links-mobile">
            Sign Up
          </Link>
        </li>
        <ul className="account-box">
          <li className="nav-item">
            <p className="nav-links">Login</p>
          </li>
          <li className="nav-item">
            <div className="nav-links sign-up-wrapper">
              <p>Sign Up</p>
            </div>
          </li>
        </ul>
      </ul>
    </nav>
  );
};
