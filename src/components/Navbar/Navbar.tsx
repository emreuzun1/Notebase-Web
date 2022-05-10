import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { VscDebugBreakpointLog } from "react-icons/vsc";

import { State } from "../../Interfaces/State";
import "./Navbar.styles.css";
import { persistor } from "../../rxutils";

export const Navbar = () => {
  const [click, setClick] = useState<boolean>(false);
  const navigate = useNavigate();
  const { student } = useSelector((state: State) => state.auth);
  const dispatch = useDispatch();

  const handleClick = () => setClick(!click);

  const navigateMain = useCallback(() => {
    navigate("/main");
  }, [navigate]);

  const openLogin = () => {
    const modal = document.getElementById("login");
    modal?.classList.add("isOpen");
  };

  const openSignup = () => {
    const modal = document.getElementById("signup");
    modal?.classList.add("isOpen");
  };

  const exit = async () => {
    await persistor.purge();
  };

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
          <Link to="/main" className="nav-links">
            Notes
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-links">
            Contact
          </Link>
        </li>
        {student ? (
          <>
            <div className="profile-container">
              <BsFillPersonFill className="icon" />
              <div className="profile-card">
                <div className="card-top">
                  <p>Hi, {student.user.first_name}</p>
                  <div>
                    <p>0</p>
                    <VscDebugBreakpointLog size={24} />
                  </div>
                </div>
                <div className="card-bottom">
                  <div
                    onClick={() =>
                      document
                        .getElementById("settings-modal")
                        ?.classList.add("isOpen")
                    }
                  >
                    Settings
                  </div>
                  <a
                    href="/"
                    onClick={() => {
                      persistor.purge();
                    }}
                  >
                    Exit
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <ul className="account-box">
            <li className="nav-item">
              <div className="nav-links" onClick={openLogin}>
                Login
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-links sign-up-wrapper" onClick={openSignup}>
                <p>Sign Up</p>
              </div>
            </li>
          </ul>
        )}
      </ul>
    </nav>
  );
};
