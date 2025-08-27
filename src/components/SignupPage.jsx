import { Link } from "react-router-dom";
import "./SignupPage.css";

function SignupPage() {
return (
    <div className="page">
      <div className="card">
        <img src="src/assets/htu.png" alt="HTU" className="logo" />

        <h1 className="title">Create Account</h1>
        <p className="subtitle">Sign up to access the student portal.</p>

        <form className="form">
          <div className="field">
            <label htmlFor="name" className="label">Full name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="input"
              required
            />
          </div>

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
              placeholder="Create a password"
              className="input"
              required
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
            />
          </div>

          <button type="submit" className="btn">
            Sign up
          </button>

          <div className="aux">
            <span>Already have an account? </span>
            <Link to="/login" className="link">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage
