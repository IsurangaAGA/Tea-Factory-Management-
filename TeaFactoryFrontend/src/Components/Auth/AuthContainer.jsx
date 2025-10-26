import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./Auth.css";

function AuthContainer() {

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // inside AuthContainer
      const handleLoginSuccess = () => {
          navigate("/home"); // redirect to /home after login
      };

  return (
    <React.Fragment>
      <div className="auth-background" />

      <div className={`auth-page`}>
        <div className={`container ${!isLogin ? "active" : ""}`}>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
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

