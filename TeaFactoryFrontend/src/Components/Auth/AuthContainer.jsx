import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={`container ${!isLogin ? "active" : ""}`}>
      <LoginForm />
      <SignupForm />

      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Welcome to Treewhiff</h1>
          <p>Don't have an account?</p>
          <button className="btn register-btn" onClick={() => setIsLogin(false)}>
            Register
          </button>
        </div>
        <div className="toggle-panel toggle-right">
          <h1>Welcome Back</h1>
          <p>Already have an account?</p>
          <button className="btn login-btn" onClick={() => setIsLogin(true)}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;
