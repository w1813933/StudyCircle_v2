
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LogIn.css";
import { login } from "../../api";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      console.log("Sending login request:", formData);
      const response = await login(formData);

 
      console.log("Login response:", response);

      const { user } = response.data;

      if (user && user.id) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userId", user.id);

      } else {
        console.error("Invalid login response:", response);
        setErrorMessage("Unexpected error. Please try again.");
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="login-container">
      
    
      <header className="login-header">
      <Link to="/">
        <img className="logo" src="images/scLogo.JPG" alt="logo" />
      </Link>
      </header>

    <div className="wrapper">
      <h1 className="title">Log In</h1>
      <p id="error-message" className="error-message">{errorMessage}</p>

        <form id="login_form"onSubmit={handleSubmit}>
        <div>
            <input type="email" id="email_input" name="email" placeholder="Email" className="input-field"  value={formData.email} onChange={handleChange} />
          </div>

          <div>
            <input type="password" id="password_input" name="password" placeholder="Password" className="input-field" value={formData.password} onChange={handleChange}/>
          </div>

          <div>
          <button type="submit" className="log-in-button">Log In</button>
          </div>

          <ul>
            <Link to="/forgot">Forgot Password</Link>
          </ul>

          <h4>
            No Account? <Link to="/signup">Sign Up</Link>
          </h4>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
