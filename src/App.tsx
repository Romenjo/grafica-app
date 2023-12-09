import { Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import HFractalPage from "./pages/HFractalPage";
import MyRoutes from "./MyRoutes";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <MyRoutes />
    </>
  );
}

export default App;
