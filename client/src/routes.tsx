import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ExpenseSplitter from "./pages/ExpenseSplitter";
import GroupManagement from "./pages/GroupManagement";
import Upload from "./pages/Upload";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Logout from "./pages/Logout";
import Analytics from "./pages/Analytics";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/expense-splitter" element={<ExpenseSplitter />} />
      <Route path="/groups" element={<GroupManagement />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/community" element={<Community />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/about" element={<About />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  </Router>
);

export default AppRoutes;
