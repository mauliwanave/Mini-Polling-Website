import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PollList from "./pages/PollList";
import PollDetail from "./pages/PollDetail";
import CreatePoll from "./pages/CreatePoll";
import Results from "./pages/Results";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<PollList />} />
        <Route path="/polls/:id" element={<PollDetail />} />
        <Route path="/results/:id" element={<Results />} />

        {/* Admin Routes */}
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreatePoll />} />
      </Routes>
    </Router>
  );
}

export default App;
