import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { VscDebugBreakpointLog } from "react-icons/vsc";

import { State } from "../../Interfaces/State";
import { requestLogin } from "../../rxutils/actions";
import "./Navbar.styles.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const { student } = useSelector((state: State) => state.auth);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const onLogin = async () => {
    dispatch(requestLogin({ username, password }, navigateMain));
  };

  const navigateMain = useCallback(() => {
    navigate("/main");
  }, [navigate]);

  return (
    <nav className="navbar">
      <div className="logo-container" onClick={() => navigate("/")}>
        <div className="logo">
          <img src={require("../../assets/logo.png")} alt="Notebase Logo" />
        </div>
        <p className="notebase-title">Notebase</p>
      </div>
      <div className="routes">
        <p className="route">About us</p>
        <p className="route" onClick={() => navigate("main")}>
          Notes
        </p>
        {!student && (
          <>
            <input
              type="text"
              className="text-input"
              placeholder="Kullanıcı adınız"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              type="password"
              className="text-input"
              placeholder="Şifreniz"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="login-button" onClick={onLogin}>
              <p className="login">Login</p>
            </div>
          </>
        )}
        {student && (
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
                  <a href="#">Settings</a>
                  <a href="#">Exit</a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
