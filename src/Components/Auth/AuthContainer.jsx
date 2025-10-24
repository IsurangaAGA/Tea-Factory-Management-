import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./Auth.css";

function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <React.Fragment>
      <div className="auth-background" />

      <div className={`auth-page`}>
        <div className={`container ${!isLogin ? "active" : ""}`}>
          <LoginForm />
          <SignupForm />

          <div className="toggle-box">
            <div className="toggle-panel toggle-left">
              <h1>Welcome to Treewhiff</h1>
              <p>Don't have an account?</p>
              <button
                className="btn register-btn"
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome Back</h1>
              <p>Already have an account?</p>
              <button
                className="btn login-btn"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AuthContainer;

