import React, {useContext} from "react";
import { TaskContext } from "../../contexts/TaskContext"; 
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
    const { notifications } = useContext(TaskContext);
    return (
        <div className="profile-container">
            <div id="left-column">
                <header>
                    <img className="profile-logo" src="images/scLogo2.JPG" alt="Profile Logo" />
                </header>

                <nav>
                    <Link to="/dashboard"><button>Dashboard</button></Link>
                    <br />
                    <br />
                    <Link to="/tasks"><button>Tasks</button></Link>
                    <br />
                    <br />
                    <Link to="/notes"><button>Notes</button></Link>
                    <br />
                    <br />
                    <Link to="/calendar"><button>Calendar</button></Link>
                    <br />
                    <br />
                    <Link to="/chat"><button>Chat</button></Link>
                    <br />
                    <br />
                    <Link to="/notifications"><button>Notifications {notifications.length > 0 && (
                         <span className="notification-badge">{notifications.length}</span>
                         )}</button></Link>
                    <br />
                    <br />
                    <Link to="/settings"><button>Settings</button></Link>
                </nav>
            </div>

            <div id="profile-page">
            <header className="profile-header">
                    <h1>Profile</h1>
                </header>

                <h2 className="complete-count-header">Completed<p className="complete-count">0</p></h2>

                <h2 className="overdue-count-header">Overdue<p className="overdue-count">0</p></h2>
            </div>
        </div>
    );
};

export default Profile;