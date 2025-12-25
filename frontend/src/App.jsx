// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> {/* ADD THIS */}
        <Route path="/settings" element={<Settings />} /> {/* ADD THIS */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* ADD THIS */}
        <Route path="/posts" element={<Posts />} /> {/* ADD THIS */}
        <Route path="*" element={<Landing />} /> {/* Catch-all */}
      </Routes>
    </Router>
  );
}

export default App;
