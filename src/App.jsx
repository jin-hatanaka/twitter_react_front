import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpLogInPage from "./pages/SignUpLogInPage";
import HomePage from "./pages/HomePage";
import TweetDetailPage from "./pages/TweetDetailPage";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import ProfilePage from "./pages/ProfilePage";
import NotificationPage from "./pages/NotificationPage";
import MessagePage from "./pages/MessagePage";
import BookmarkPage from "./pages/BookmarkPage";

function App() {
  return (
    <>
      <CurrentUserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SignUpLogInPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/tweets/:id" element={<TweetDetailPage />} />
            <Route path="/users/:id" element={<ProfilePage />} />
            <Route path="notification" element={<NotificationPage />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="bookmark" element={<BookmarkPage />} />
          </Routes>
        </Router>
      </CurrentUserProvider>
    </>
  );
}

export default App;
