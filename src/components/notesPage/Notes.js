
import React, { useState, useEffect, useCallback, useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext"; 
import { Link } from "react-router-dom";
import "./Notes.css"; 

const Notes = () => {
     const { notifications } = useContext(TaskContext);
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});
    const userId = localStorage.getItem("userId");

    const fetchNotes = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/notes?userId=${userId}`);
            if (!response.ok) throw new Error("Failed to fetch notes");
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }, [userId]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const saveNote = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!title.trim()) newErrors.title = "Title is required.";
        if (!date) newErrors.date = "Date is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        console.log("Saving task...");
        console.log("userId from localStorage:", userId);

        if (!userId) {
            alert("User ID not found. Please log in again.");
            return;
        }

        try {
            if (isEditing) {
                const response = await fetch(`http://localhost:5000/api/notes/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, title, date, description }),
                });
                if (!response.ok) throw new Error("Failed to update note");
            } else {
                const response = await fetch(`http://localhost:5000/api/notes`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, title, date, description }),
                });
                if (!response.ok) throw new Error("Failed to create note");
            }

            await fetchNotes();
            setTitle("");
            setDate("");
            setDescription("");
            setShowModal(false);
            setIsEditing(false);
            setEditingId(null);
        } catch (error) {
            console.error(error);
        }
    };

    const editNote = (note) => {
        setTitle(note.title);
        setDate(note.date);
        setDescription(note.description);
        setIsEditing(true);
        setEditingId(note.id);
        setShowModal(true);
    };

    const deleteNote = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/notes/${id}`, {
                method: "DELETE",
            });
            await fetchNotes();
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };

    return (
        <div className="notes-container">
            <div id="left-column">
                <header>
                    <img className="dashboard-logo" src="images/scLogo2.JPG" alt="dashboard-logo" />
                </header>
                <nav>
                    <Link to="/dashboard"><button>Dashboard</button></Link><br /><br />
                    <Link to="/tasks"><button>Tasks</button></Link><br /><br />
                    <button className="notes-select active">Notes</button><br /><br />
                    <Link to="/calendar"><button>Calendar</button></Link><br /><br />
                    <Link to="/chat"><button>Chat</button></Link><br /><br />
                    <Link to="/notifications"><button>Notifications 
                        {notifications.length > 0 && (
                         <span className="notification-badge">{notifications.length}</span>
                         )}
                        </button></Link><br /><br />
                    <Link to="/settings"><button>Settings</button></Link>
                </nav>
            </div>

            <div id="notes-page">
                <div className="notes-header-container">
                    <header className="notes-header">
                        <h1>Notes</h1>
                    </header>
                    <button
                        className="add-notes-button"
                        onClick={() => {
                            setTitle('');
                            setDate('');
                            setDescription('');
                            setIsEditing(false);
                            setEditingId(null);
                            setShowModal(true);
                        }}
                    >
                        +
                    </button>
                </div>

                {showModal && (
                    <section className="modal-container">
                        <section className="notes-modal">
                            <button onClick={() => setShowModal(false)} className="close-btn">x</button>
                            <div className="modal-content">
                                <h1>Note</h1>
                                <form className="modal-form" onSubmit={saveNote}>
                                    <div>
                                        <label>Title:</label>
                                        {errors.title && <div className="error">{errors.title}</div>}
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        /><br />

                                        <label>Date:</label>
                                        {errors.date && <div className="error">{errors.date}</div>}
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        /><br />

                                        <label>Description:</label><br />
                                        <textarea
                                            className="notes-description-input"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea><br />

                                        <button type="submit" className="save-notes">Save</button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </section>
                )}

                <div className="notes-list">
                    {notes.map(note => (
                        <div key={note.id} className="note-panel">
                            <div className="note-content">
                                <div><strong>{note.title}</strong> – {new Date(note.date).toLocaleDateString('en-GB')}</div>
                                
                            </div>

                            <div className="note-buttons">
                                <button className="note-button edit-button" onClick={() => editNote(note)}>🖊</button>
                                <button className="note-button delete-button" onClick={() => deleteNote(note.id)}>🗑</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Notes;