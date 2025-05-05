import React from 'react';
import './HomePage.css'
import { Link } from 'react-router-dom';



const Home = () => {
  
    return (
        <div className="bg-container">
          
          <header className="homepage-header">
            <img className="logo" src="images/scLogo.JPG" alt="logo" />
            <nav>
              <ul className="nav-links">
                
              <Link to="/">
                <button className="home-button">Home</button>
                </Link>

                <Link to="/signup">
                    <button className="signup-button">Sign Up</button>
                </Link>

                <Link to="/login">
                  <button className="login-button">Log In</button>
                </Link>
                
              </ul>
            </nav>
          </header>
    
       
          <div className="background-section">
            <img src="images/groupCircle.jpg" alt="background" />
            <div className="overlay">
              <h1>Simplify, Organise, Succeed.</h1>
              <h3>
                Simplifying your Workload Leads to Better Organisation and that is the Key to Success.
                <br />
                Join Us Today and Experience a Smarter Way to Plan, Manage, and Succeed in your Academic Journey.
              </h3>
            </div>
          </div>
    
         
          <div className="content">
            <h2>Welcome!</h2>
            <p>
              Study Circle, the all-in-one student planner designed to make academic life more manageable and productive.
              Whether you’re struggling to keep up with deadlines, balance your workload, or collaborate on group projects,
              Study Circle is here to simplify your planning process and help you succeed.
              <br />
              <br />
              Our platform combines essential tools like task management, time-blocking, and deadline tracking with innovative
              features such as progress visualization and real-time collaboration. We focus on creating a seamless user experience,
              with a clean interface and intuitive navigation, ensuring that students of all levels can use it effectively.
              <br />
              <br />
              Study Circle isn’t just about managing tasks—it’s about empowering students to achieve their academic goals while
              maintaining balance and reducing stress. With smart notifications, personalized scheduling, and robust tracking features,
              Study Circle helps you stay organized, productive, and focused on what truly matters.
              <br />
              <br />
              Join Study Circle today and transform the way you approach your studies—simplify, organize, and succeed!
            </p>
          </div>
        <footer className='footer'>
            <p>Contact Us <br /> w1813933@my.westminster.ac.uk</p>
            
            
            
        </footer>
        </div>
      );
      

    };
    
    
  
  
  export default Home;