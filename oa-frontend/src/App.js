import Auth from "./components/Auth";
import Header from "./components/Header";
import Title from "./components/Title";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Survey from "./pages/Survey";
import About from "./pages/About";

function App() {

  return (
    <Auth>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Title />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="survey" element={<Survey />} />
        </Route>
      </Routes>
    </Auth>
  );
}

export default App;
