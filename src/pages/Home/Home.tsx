import { Login } from "../../components/ Login/Login";
import { SignUp } from "../../components/Sign Up/SignUp";
import "./Home.styles.css";

export const Home = () => {
  return (
    <div
      className="container"
      style={{
        backgroundImage: "linear-gradient(to bottom, #E69B69, #FFFFFF)",
      }}
    >
      <p className="title" data-testid="title">
        Free notes for every students
      </p>
      <p className="sub-title">
        Upload your notes and see the other students notes
      </p>
      <img
        src={require("../../assets/homepage.png")}
        alt="Home Page"
        className="homepage-picture"
      />
      <div className="modalView" id="login">
        <Login />
      </div>
      <div className="modalView" id="signup">
        <SignUp />
      </div>
    </div>
  );
};
