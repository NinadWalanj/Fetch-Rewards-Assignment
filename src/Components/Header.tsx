import { api } from "../api";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  userName?: string;
  onLogout?: () => void;
}

export default function Header({ userName, onLogout }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error(err);
    }
    // clear our persisted flag
    localStorage.removeItem("isLoggedIn");
    // optionally inform parent (not strictly needed here)
    onLogout?.();
    // send back to login
    navigate("/login");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h1>Fetch Dogs</h1>
      <div>
        {userName && (
          <span style={{ marginRight: "1rem" }}>Hello, {userName}</span>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}
