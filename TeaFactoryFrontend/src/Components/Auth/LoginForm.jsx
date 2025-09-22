import React, { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password, role });
  };

  return (
    <div className="form-box login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="forgot-link">
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="btn">Login</button>

        <p>or login with social platforms</p>

        <div className="social-icons">
          <a href="#"><i className='bx bxl-google'></i></a>
          <a href="#"><i className='bx bxl-facebook'></i></a>
          <a href="#"><i className='bx bxl-github'></i></a>
          <a href="#"><i className='bx bxl-linkedin'></i></a>
        </div>


      </form>
    </div>
  );
}

export default LoginForm;
