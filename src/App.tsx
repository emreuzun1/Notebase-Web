import background from "./assets/background.png";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
