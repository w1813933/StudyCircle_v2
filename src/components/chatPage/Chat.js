import React, {useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext"; 
import { Link } from "react-router-dom";
import "./Chat.css";

const Chat = () => {
     const { notifications } = useContext(TaskContext);


    return (
        <div className="chat-container">
            
            <div id="left-column">
                <header>
                    <img className="dashboard-logo" src="images/scLogo2.JPG" alt="dashboard-logo" />
                </header>

                <nav>
                    <Link className="chat" to="/dashboard">
                        <button>Dashboard</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="chat" to="/Tasks">
                        <button>Tasks</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="chat" to="/notes">
                        <button>Notes</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="chat" to="/calendar">
                        <button>Calendar</button>
                    </Link>
                    <br />
                    <br />
                    <button className="chat-select active">
                        Chat
                    </button>
                    <br />
                    <br />
                    <Link className="chat" to="/notifications">
                        <button>Notifications {notifications.length > 0 && (
                         <span className="notification-badge">{notifications.length}</span>
                         )}</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="chat" to="/settings">
                        <button>Settings</button>
                    </Link>
                </nav>
            </div>

            {/* Main Content Area */}
            <div id="chat-page">
                <header className="chat-header">
                    <h1>Chat</h1>
                </header>
           
                       
            </div>
            
        </div>
    );
};

export default Chat;