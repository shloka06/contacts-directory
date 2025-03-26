import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import ContactDetail from "./components/ContactDetail";
import "./styles.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
        <Route path="/contact/:id" element={<ContactDetail />} />
      </Routes>
    </Router>
  );
};

export default App;