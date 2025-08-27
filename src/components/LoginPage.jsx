import { Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {

  return (
    <div className="page">
      <div className="card">
        <img src="src/assets/htu.png" alt="HTU" className="logo" />

        <h1 className="title">Student Login</h1>
        <p className="subtitle">Enter your credentials to access the student portal.</p>

        <form className="form">
          <div className="field">
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="student@htu.edu"
              className="input"
              required
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
            />
          </div>

          <button type="submit" className="btn">
            Login
          </button>

          <div className="aux">
            <span>Don’t have an account? </span>
            <Link to="/sign-up" className="link">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage

