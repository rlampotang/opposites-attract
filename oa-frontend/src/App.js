import Auth from "./components/Auth";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Title from "./components/Title";
import { Routes, Route, Outlet, Link } from "react-router-dom";

function App() {

  return (
    <Auth>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Title />} />
          <Route path="about" element={null} />
        </Route>
      </Routes>
    </Auth>
  );
}

export default App;
