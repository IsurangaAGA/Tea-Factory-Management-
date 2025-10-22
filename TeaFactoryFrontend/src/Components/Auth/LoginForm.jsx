import React, { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { username, password, role };

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.text();
        alert(result);
      } else {
        const error = await response.text();
        alert(error);
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
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
          <a href="#"><i className="bx bxl-google"></i></a>
          <a href="#"><i className="bx bxl-facebook"></i></a>
          <a href="#"><i className="bx bxl-github"></i></a>
          <a href="#"><i className="bx bxl-linkedin"></i></a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

