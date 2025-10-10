import React, { useState } from "react";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, email, password, role };

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Registration successful!");
        setUsername(""); setEmail(""); setPassword(""); setRole("");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="form-box register">
      <form onSubmit={handleSubmit}>
        <h1>Registration</h1>
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
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="bx bxs-envelope"></i>
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

        <button type="submit" className="btn">Register</button>

        <p>or register with social platforms</p>
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

export default SignupForm;

