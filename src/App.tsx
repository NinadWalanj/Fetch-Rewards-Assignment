import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import SearchPage from "./pages/Search";

export default function App() {
  // initialize from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginPage
            onLoginSuccess={() => {
              localStorage.setItem("isLoggedIn", "true");
              setIsLoggedIn(true);
            }}
          />
        }
      />

      <Route
        path="/search"
        element={isLoggedIn ? <SearchPage /> : <Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/search" : "/login"} replace />}
      />
    </Routes>
  );
}
