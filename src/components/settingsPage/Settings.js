import React, { useContext} from "react";
import { TaskContext } from "../../contexts/TaskContext"; 
import { ThemeContext } from '../../contexts/ThemeContext';
import { useNavigate, Link } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
    const { notifications } = useContext(TaskContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const toggleTheme = () => {
      setDarkMode(prev => !prev);
    };

    return (
        <div className="settings-container">
            
            <div id="left-column">
                <header>
                    <img className="dashboard-logo" src="images/scLogo2.JPG" alt="dashboard-logo" />
                </header>

                <nav>
                    <Link className="settings" to="/dashboard">
                        <button>Dashboard</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="settings" to="/Tasks">
                        <button>Tasks</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="settings" to="/notes">
                        <button>Notes</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="settings" to="/calendar">
                        <button>Calendar</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="settings" to="/chat">
                        <button>Chat</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="settings" to="/notifications">
                        <button>Notifications {notifications.length > 0 && (
                         <span className="notification-badge">{notifications.length}</span>
                         )}</button>
                    </Link>
                    <br />
                    <br />
                    <button className="settings-select active">
                        Settings
                    </button>
                </nav>
            </div>

            {/* Main Content Area */}
            <div id="settings-page">
           
                <div>
                <button onClick={toggleTheme} className="dark-mode-button">
                    Switch to {darkMode ? "Light" : "Dark"} Mode
                </button>
                <button onClick={handleLogout} className="log-out-button">Log Out</button>
                
                </div>
            </div>
            
        </div>
    );
};

export default Settings;