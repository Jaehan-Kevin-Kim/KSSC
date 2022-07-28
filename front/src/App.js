import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
import Header from "./components/Header";
import ConsultForm from "./pages/ConsultForm";
import ManageUser from "./pages/ManageUser";
// import HookFormTest from "./pages/HookFormTest";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Modal } from "react-modal";

// Modal.setAppElement("#root");

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/manageUser" element={<ManageUser />} />
          <Route path="/consultForm" element={<ConsultForm />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
