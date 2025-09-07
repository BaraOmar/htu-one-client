import { Link } from "react-router-dom";
import { useState } from "react";

import "./css/SignupPage.css";

function SupervisorSignupPage({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup/supervisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName: name, password }),
      });
      const data = await res.json();
      const user = data.user;
      if (res.ok) onLogin(user);
      else alert(data.message || "Signup failed");
    } catch (e) {
      alert(e.message || "Signup error");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signup();
  };


return (
    <div className="page">
      <div className="card">
        <img src="src/assets/htu.png" alt="HTU" className="logo" />

        <h1 className="title">Create Account</h1>
        <p className="subtitle">Sign up to access the supervisor portal.</p>

        <form className="form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="name" className="label">Full name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="input"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="supervisor@htu.edu"
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
              placeholder="Create a password"
              className="input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="confirm" className="label">Confirm password</label>
            <input
              id="confirm"
              type="password"
              placeholder="Repeat your password"
              className="input"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Creating..." : "Sign up"}
          </button>

          <div className="aux">
            <span>Sign up as a student? </span>
            <Link to="/student-sign-up" className="link">Sign up</Link>
            <br />
            <br />
            <span>Already have an account? </span>
            <Link to="/login" className="link">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SupervisorSignupPage
