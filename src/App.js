import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FolderList from "./components/FolderList";
import FolderView from "./components/FolderView";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Register from "./components/Register";
import { Background } from "./styles/SharedStyleComponents";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Background></Background>
      <Router>
        <Routes>
          <Route path="/" element={<FolderList />} />
          <Route path="/folder/:folderId" element={<FolderView />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
