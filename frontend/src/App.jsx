// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />  {/* ADD THIS */}
        <Route path="*" element={<Landing />} />  {/* Catch-all */}
      </Routes>
    </Router>
  );
}

export default App;
