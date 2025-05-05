import React, { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext"; 
import { Link } from "react-router-dom";
import "./Notifications.css";



const Notifications = () => {
    const { notifications } = useContext(TaskContext);

    return (
        <div className="notification-container">
            
            <div id="left-column">
                <header>
                    <img className="dashboard-logo" src="images/scLogo2.JPG" alt="dashboard-logo" />
                </header>

                <nav>
                    <Link className="notifications" to="/dashboard">
                        <button>Dashboard</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="notifications" to="/tasks">
                        <button>Tasks</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="notifications" to="/notes">
                        <button>Notes</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="notifications" to="/calendar">
                        <button>Calendar</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="notifications" to="/chat">
                        <button>Chat</button>
                    </Link>
                    <br />
                    <br />
                    <button className="notifications-select active">
                        Notifications
                        {notifications.length > 0 && (
                         <span className="notification-badge">{notifications.length}</span>
                         )}
                    </button>
                    <br />
                    <br />
                    <Link className="notifications" to="/settings">
                        <button>Settings</button>
                    </Link>
                </nav>
            </div>

            {/* Main Content Area */}
            <div id="notifications-page">

            <div className="notifications-header-container">

                <header className="notifications-header">
                        <h1>Notifications</h1>
                    </header>
            </div>   
                <div className="notifications-list">
                    {notifications.length === 0 ? (
                        <p className="no-notifications">No notifications yet!</p>
                    ) : (
                        notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`notification-panel ${
                            notification.type === "overdue" ? "overdue" : "warning"
                            }`}
                        >
                            <p>{notification.message}</p>
                        </div>
                        ))
                    )}
                    </div>
            </div>
            
        </div>
    );
};

export default Notifications;