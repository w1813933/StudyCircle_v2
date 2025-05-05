import React, { useEffect, useState, useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext"; 

import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
    const { tasks, notes, notifications } = useContext(TaskContext);
    const [dateTime, setDateTime] = useState("");
    const [userName, setUserName] = useState("");
    //Break Timer
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setDateTime(now.toLocaleString());
        };
    
        updateTime(); // Initial call
        const interval = setInterval(updateTime, 1000);


    
    
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserName(parsedUser.name);
            } catch (error) {
                console.error("Failed to parse user data:", error);
            }
        }

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

     // Break timer effect
     useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    // Timer controls
    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleRestart = () => {
        setTimeLeft(600);
        setIsRunning(false);
    };
    
    

    return (
        <div className="dashboard-container">
            
            <div id="left-column">
                <header>
                    <img className="dashboard-logo" src="images/scLogo2.JPG" alt="dashboard-logo" />
                </header>

                <nav>
                    <button className="dashboard-select active">
                        Dashboard
                    </button>
                    <br />
                    <br />
                    <Link className="dashboard" to="/tasks">
                        <button>Tasks</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="dashboard" to="/notes">
                        <button>Notes</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="dashboard" to="/calendar">
                        <button>Calendar</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="dashboard" to="/chat">
                        <button>Chat</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="dashboard" to="/notifications">
                        <button>Notifications
                        {notifications.length > 0 && (
                         <span className="notification-badge">{notifications.length}</span>
                        )}
                        </button>
                    </Link>
                    <br />
                    <br />
                    <Link className="dashboard" to="/settings">
                        <button>Settings</button>
                    </Link>
                </nav>
            </div>

            <div id="dashboard-page">

            <div className="dashboard-header-container">
                <header className="welcome_header">
                    <h1 id="welcome">Welcome, {userName}</h1>
                </header>

                <h2 id="datetime">{dateTime}</h2>

                <Link to="/profile">
                    <img className="profile-pic" src="images/profile.jpg" alt="profile-pic" />
                </Link>
            </div>
                
            <section className="dashboard-section-task">
                    <h1 id="task_display">TASKS
                    <div className="task_display_panel">
                    <ul className="task-list">
                        {tasks.map(task => (
                            <li className = "task_display_notify" key={task.id}>
                                {task.title} - Due: {new Date(task.dueDate).toLocaleDateString()} 
                            </li>
                        ))}
                    </ul>
                    </div>
                    </h1>
                   
                </section>

                <section className="dashboard-section-notes">
                    <h1 id="notes">NOTES
                    <div className="notes_dispay_panel">
                        <ul className="note-list">
                        {notes.map(note => (
                            <li key={note.id} className="note_display_notify">
                            <strong>{note.title}</strong><br />
                            {note.content}
                            </li>
                        ))}
                        </ul>
                    </div>
                    </h1>
                </section>

                <section className="dashboard-section-deadline">
                    <h1 id="deadlines_view">DEADLINES
                    <div className="deadlines_display_panel">
                        <ul className="deadline-list">
                        {tasks
                            .filter(task => !task.completed)
                            .map(task => (
                            <li key={task.id} className="deadline_display_notify">
                                <strong>{task.title}</strong><br />
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                            </li>
                            ))}
                        </ul>
                    </div>
                    </h1>
                </section>


                <section className="dashboard-section-break">
                    <h1 id="break">BREAK
                  
                        <h2 className="break-timer">
                        {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
                        {String(timeLeft % 60).padStart(2, '0')}
                        </h2>

                        {!isRunning && timeLeft > 0 && (
                        <button onClick={handleStart} className="timer-btn play">▶</button>
                        )}

                        {isRunning && (
                        <button onClick={handlePause} className="timer-btn pause"><b>| |</b></button>
                        )}

                        {!isRunning && timeLeft < 600 && timeLeft > 0 && (
                        <button onClick={handleRestart} className="timer-btn restart">↻</button>
                        )}

                        {timeLeft === 0 && (
                        <button onClick={handleRestart} className="timer-btn restart">↻</button>
                        )}
                    
                    </h1>
                </section>

                <section className="dashboard-section-calendar">
                    <h1 id="calendar_view">CALENDAR</h1>
                </section>
            </div>
            </div>
            
      
    );
};

export default Dashboard;