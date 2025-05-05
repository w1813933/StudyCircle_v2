
import React, { useState } from "react";
import {useNavigate, Link } from "react-router-dom";
import "./ForgotPassword.css";
import { forgotPassword } from "../../api";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const { email, newPassword, confirmPassword } = formData;

    if (!email || !newPassword || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("Password must have at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      console.log("Sending data to server:", formData);
      await forgotPassword(formData);
      setSuccessMessage("Password reset successfully.");
      setTimeout(() => navigate("/login"), 2000);
  } catch (err) {
      console.error("Error response:", err);
      setErrorMessage(err.response?.data?.message || "Password reset failed.");
  }
  };
  
  return (
    <div className="forgot-container">
      
    
      <header className="forgot-header">
      <Link to="/">
        <img className="logo" src="images/scLogo.JPG" alt="logo" />
      </Link>
      </header>

    <div className="wrapper">
      <h1 className="title">Forgot Password</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}


        <form id="forgot_form"onSubmit={handleSubmit}>

          <div>
            <input type="email" name="email" placeholder="Email" className="input-field" value={formData.email} onChange={handleChange} />
          </div>

          <div>
            <input type="password" name="newPassword" placeholder="New Password" className="input-field" value={formData.newPassword} onChange={handleChange}/>
          </div>

          <div>
          <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input-field" value={formData.confirmPassword} onChange={handleChange}/>
          </div>

          <div>
           
              <button type="submit" className="confirm-password-button">Confirm</button>
            
          </div>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
