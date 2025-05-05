// SignUp.js
import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate, Link } from "react-router-dom";
import { signup } from '../../api';

const SignUp = () => {
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirm_password: "",
});

const [errorMessage, setErrorMessage] = useState("");

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, password, confirm_password } = formData;

  if (!name || !email || !password || !confirm_password) {
    setErrorMessage("All fields are required.");
    return;
  }


  if (password.length < 8) {
    setErrorMessage("Password must have at least 8 characters.");
    return;
  }

  if (password !== confirm_password) {
    setErrorMessage("Passwords do not match.");
    return;
  }

  try {
    await signup(formData);
    //alert("Signup successful!");
    navigate("/login");

  } catch (err) {
    setErrorMessage(err.response?.data?.error || "Signup failed.");
  }
};

  return (
    <div className="signup-container">
      
      
        <header className="signup-header">
          <Link to='/'>
          <img className="logo" src="images/scLogo.JPG" alt="logo" />
          </Link>
        </header>
     

      <div className="wrapper">
        <h1 className="title">Sign Up</h1>
        <p id="error-message" className="error-message">{errorMessage}</p>

        <form id="signUp_form" onSubmit={handleSubmit}>
          <div>
            <input type="text" id="name_input" name="name" placeholder="Name" className="input-field"  value={formData.name} onChange={handleChange}/>
          </div>

          <div>
            <input type="email" id="email_input" name="email" placeholder="Email" className="input-field" value={formData.email} onChange={handleChange} />
          </div>

          <div>
            <input type="password" id="password_input" name="password" placeholder="Password" className="input-field" value={formData.password} onChange={handleChange}/>
          </div>
          
          <div>
            <input type="password" id="confirm_password_input" name="confirm_password" placeholder="Confirm Password" className="input-field" value={formData.confirm_password} onChange={handleChange} />
          </div>

          <div className="button-container">
            <button type="submit" className="sign-up-button">Sign Up</button>
            <h4>
              Already have an Account? <Link to='/login'>Log In</Link>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;