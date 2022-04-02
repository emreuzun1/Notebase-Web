import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

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

function App() {
  return (
    <div style={{}}>
      <Navbar />
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
    </div>
  );
}

export default App;
