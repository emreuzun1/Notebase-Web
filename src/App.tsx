import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Worker } from "@react-pdf-viewer/core";
import "react-toastify/dist/ReactToastify.css";

import { Navbar } from "./components/Navbar/Navbar";
import { State } from "./Interfaces/State";
import { Documentation } from "./pages/Documentation/Documentation";
import { Home } from "./pages/Home/Home";
import { Main } from "./pages/Main/Main";

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

function MainRouter() {}

export const App = () => {
  return (
    <div style={{}}>
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
        </Routes>
      </Worker>
    </div>
  );
};

export default App;
