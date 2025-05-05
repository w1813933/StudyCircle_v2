//Tasks.js
import React, { useState, useEffect, useContext } from "react";
import { useCallback } from "react"; 
import { Link } from "react-router-dom";
import "./Tasks.css";
import { TaskContext } from "../../contexts/TaskContext";

const Tasks = () => {
    const { notifications } = useContext(TaskContext);
    const { tasks, setTasks } = useContext(TaskContext);
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [date, setDueDate] = useState("");
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [errors, setErrors] = useState({});
    const userId = localStorage.getItem("userId");

    const fetchTasks = useCallback(async () => {
        try {
           
            const response = await fetch(`http://localhost:5000/api/tasks?userId=${userId}`);
            if (!response.ok) throw new Error("Failed to fetch tasks");
            const data = await response.json();
            const incompleteTasks = data.filter(task => !task.completed); // Only show tasks not completed

            // Detect overdue tasks
            const today = new Date();
            const updatedTasks = incompleteTasks.map(task => {
                const taskDate = new Date(task.date);
                return {
                    ...task,
                    dueDate: task.date,
                    overdue: taskDate < today.setHours(0, 0, 0, 0) // Mark if task is overdue
                };
            });
            
            
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }, [userId, setTasks]);

    
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    //Add Tasks
    const addTask = async (e) => {
        e.preventDefault();

        const newErrors = {};

    //Validations 
    if (!title.trim()) {
        newErrors.title = "Title is required.";
    }

    if (!subject.trim()) {
        newErrors.subject = "Subject is required.";
    }

    if (!date) {
        newErrors.date = "Due Date is required.";
    } else {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            newErrors.date = "Due Date cannot be in the past.";
        }
    }

    // If there are any errors, set them and stop saving
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    // If no errors, clear existing errors
    setErrors({});
        console.log("Saving task...");
        console.log("userId from localStorage:", userId);

        if (!userId) {
            alert("User ID not found. Please log in again.");
            return;
        }

        

        if (title && subject && date) {
            try {
                if (isEditing) {
                    const response = await fetch(`http://localhost:5000/api/tasks/${editingIndex}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId, title, subject, date, description }),
                    });
               

                    if (!response.ok) {
                        const error = await response.text();
                        console.error("Failed to update task:", error);
                        return;
                    }
                    
                    await fetchTasks();

                } else {
                    const response = await fetch("http://localhost:5000/api/tasks", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId, title, subject, date, description }),
                    });

                    if (!response.ok) {
                        const error = await response.text();
                        console.error("Failed to add task:", error);
                        return;
                    }

                    await fetchTasks();
                    
                }

                // Reset form
                setTitle("");
                setSubject("");
                setDueDate("");
                setDescription("");
                setShowModal(false);
                setIsEditing(false);
                setEditingIndex(null);
            } catch (err) {
                console.error("Failed to save task:", err);
            }
        }
    };

    const deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: "DELETE",
            });
          
           await fetchTasks();
        } catch (err) {
            console.error("Failed to delete task", err);
        }
    };

    
        const completeTask = async (id) => {
    try {
        // Set `completing: true` to show green effect before it disappears
        setTasks(prev =>
            prev.map(task => task.id === id ? { ...task, completing: true } : task)
        );

        // Call the backend to mark task as completed
        const response = await fetch(`http://localhost:5000/api/tasks/${id}/complete`, {
            method: "PATCH",
        });

        if (!response.ok) {
            throw new Error("Failed to complete task");
        }

        // Wait 1 seconds before refreshing the task list
        setTimeout(async () => {
            // setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            await fetchTasks(); 
        }, 1000);

    } catch (error) {
        console.error("Error completing task:", error);
    }
};
    

 

    const editTask = (task) => {
        setTitle(task.title);
        setSubject(task.subject);
        setDueDate(task.date);
        setDescription(task.description);
        setIsEditing(true);
        setEditingIndex(task.id);
        setShowModal(true);
    };
    
    return (
        <div className="tasks-container">
            <div id="left-column">
                <header>
                    <img className="dashboard-logo" src="images/scLogo2.JPG" alt="dashboard-logo" />
                </header>
                <nav>
                    <Link className="tasks" to="/dashboard"><button>Dashboard</button></Link><br /><br />
                    <button className="tasks-select active">Tasks</button><br /><br />
                    <Link className="tasks" to="/notes"> <button>Notes</button></Link><br /><br />
                    <Link className="tasks" to="/calendar"><button>Calendar</button></Link><br /><br />
                    <Link className="tasks" to="/chat"><button>Chat</button></Link><br /><br />
                    <Link className="tasks" to="/notifications"><button>Notifications 
                        {notifications.length > 0 && (<span className="notification-badge">{notifications.length}</span>)}
                        </button></Link><br /><br />
                    <Link className="tasks" to="/settings"><button>Settings</button></Link>
                </nav>
            </div>

            <div id="task-page">
            <div className="task-header-container">

                <header className="task-header">
                    <h1>Tasks</h1>
                </header>
            <button
                    className="add-task-button"
                    id="open"
                    onClick={() => {
                        setTitle('');
                        setSubject('');
                        setDueDate('');
                        setDescription('');
                        setIsEditing(false);
                        setEditingIndex(null);
                        setShowModal(true);
                    }}
                >
                    +
                </button>
                </div>

                {showModal && (
                    <section className="modal-container" id="modal">
                        <section className="modal">
                            <button onClick={() => setShowModal(false)} className="close-btn" id="close">x</button>
                            <div className="modal-content">
                                <h1>Task</h1>
                                <form className="modal-form" onSubmit={addTask}>
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        {errors.title && <div className="error">{errors.title}</div>}
                                        <input type="text" className="form-input" id="taskTitle" value={title} onChange={(e) => setTitle(e.target.value)} /><br />

                                        <label>Subject:</label>
                                        {errors.subject && <div className="error">{errors.subject}</div>}
                                        <input type="text" className="form-input" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} /><br />

                                        <label>Due Date:</label>
                                        {errors.date && <div className="error">{errors.date}</div>}
                                        <input type="date" className="form-input" id="dueDate" value={date} onChange={(e) => setDueDate(e.target.value)} /><br />

                                        <label>Description:</label><br />
                                        <textarea className="task-description-input" id="taskDescription" value={description} onChange={(e) => setDescription(e.target.value)}></textarea><br />

                                        <button type="submit" className="save-task">Save</button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </section>
                )}

                <div className="tasks-list">
                    
                    {tasks.map(task => (
                       
                      <div key={task.id} className={`task-panel ${task.completing ? 'completing' : ''} ${task.overdue ? 'overdue' : ''}`} >
                      <div className="task-content">
                        <div><strong>{task.title}</strong> – {task.subject} – {new Date(task.date).toLocaleDateString('en-GB')}</div>
                        <div className="task-description">{task.description}</div>
                      </div>
                      
                      <div className="task-buttons">
                        <button className={`task-button edit-button ${task.completing ? 'completed' : ''}`} onClick={() => editTask(task)}>🖊</button>
                        <button className={`task-button complete-button ${task.completing ? 'completed' : ''}`} onClick={() => completeTask(task.id)}>✔</button>
                        <button className={`task-button delete-button ${task.completing ? 'completed' : ''}`} onClick={() => deleteTask(task.id)}>🗑</button>
                      </div>
                      
                    </div>

                    ))}
                    
                </div>

                
            </div>
        </div>
    );
};

export default Tasks;