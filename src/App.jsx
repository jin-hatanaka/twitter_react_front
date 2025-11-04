import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpLogInPage from './pages/SignUpLogInPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpLogInPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
