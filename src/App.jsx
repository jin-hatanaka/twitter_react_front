import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpLogInPage from "./pages/SignUpLogInPage";
import HomePage from "./pages/HomePage";
import TweetDetailPage from "./pages/TweetDetailPage";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SignUpLogInPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/tweets/:id" element={<TweetDetailPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
