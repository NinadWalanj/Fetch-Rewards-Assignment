import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post("/auth/login", { name, email });
      onLoginSuccess();
      navigate("/search");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Log In
        </button>
      </form>
    </div>
  );
}
