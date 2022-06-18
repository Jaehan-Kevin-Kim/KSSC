import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
import Header from "./components/Header";
import ConsultForm from "./pages/ConsultForm";
import HookFormTest from "./pages/HookFormTest";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/consultForm" element={<ConsultForm />} />
          <Route path="/hookFormTest" element={<HookFormTest />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
