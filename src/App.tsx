import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Worker } from "@react-pdf-viewer/core";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { Navbar } from "./components/Navbar/Navbar";
import { State } from "./Interfaces/State";
import { Documentation } from "./pages/Documentation/Documentation";
import { Home } from "./pages/Home/Home";
import { Main } from "./pages/Main/Main";
import Settings from "./components/Settings/Settings";
import Contact from "./pages/Contact/Contact";
import { useEffect } from "react";
import { persistor } from "./rxutils";
import { Login } from "./components/ Login/Login";
import { SignUp } from "./components/Sign Up/SignUp";

interface PrivateRouteProps {
  children: any;
  redirectPath?: string;
}

function PrivateRoute({ children, redirectPath = "/" }: PrivateRouteProps) {
  const { student } = useSelector((state: State) => state.auth);
  if (!student) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
}

const exit = async () => {
  await persistor.purge();
};

export const App = () => {
  useEffect(() => {
    exit();
  }, []);
  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />
          <Route
            path="/main/:id"
            element={
              <PrivateRoute>
                <Documentation />
              </PrivateRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Worker>
      {
        <div className="modalView" id="settings-modal">
          {useSelector((state: State) => state.auth.student) && <Settings />}
        </div>
      }
      <div className="modalView" id="login">
        <Login />
      </div>
      <div className="modalView" id="signup">
        <SignUp />
      </div>
    </div>
  );
};

export default App;
