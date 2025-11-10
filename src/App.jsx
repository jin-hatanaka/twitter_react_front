import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpLogInPage from "./pages/SignUpLogInPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpLogInPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
