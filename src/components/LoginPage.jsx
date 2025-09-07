import { Link } from "react-router-dom";
import { useState } from "react";
import "./css/LoginPage.css";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      const user = data.user ?? data; // 👈 normalize
      if (res.ok) onLogin(user);
      else alert(data.message || "Login failed");
    } catch (e) {
      alert(e.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="page">
      <div className="card">
        <img src="src/assets/htu.png" alt="HTU" className="logo" />

        <h1 className="title">Student Login</h1>
        <p className="subtitle">Enter your credentials to access the student portal.</p>

        <form className="form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="student@htu.edu"
              className="input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="aux">
            <span>Don’t have an account? </span>
            <Link to="/student-sign-up" className="link">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
