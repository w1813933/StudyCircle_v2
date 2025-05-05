import React, { useContext, useState, useEffect} from "react";
import { TaskContext } from "../../contexts/TaskContext"; 
import { Link } from "react-router-dom";
import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
     const { notifications } = useContext(TaskContext);

     const [events, setEvents] = useState(() => {
        const saved = localStorage.getItem("calendarEvents");
        return saved ? JSON.parse(saved) : [];
    });

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        localStorage.setItem("calendarEvents", JSON.stringify(events));
    }, [events]);

    const handleEventAdd = (info) => {
        const title = prompt("Enter event title:");
        if (!title) return;

        const subject = prompt("Enter subject:");
        if (!subject) return;

        const description = prompt("Enter description:");
        if (!description) return;

        const newEvent = {
            id: Date.now(),
            title,
            subject,
            description,
            start: info.startStr,
            end: info.endStr,
            allDay: info.allDay,
        };

        setEvents((prev) => [...prev, newEvent]);
    };

    const handleEventClick = (clickInfo) => {
        const clickedEvent = events.find(e =>
            e.start === clickInfo.event.startStr &&
            e.end === clickInfo.event.endStr &&
            clickInfo.event.title.startsWith(e.title)
        );

        if (clickedEvent) {
            setSelectedEvent({ ...clickedEvent }); // clone for editing
            setShowModal(true);
        }
    };

    const handleSave = () => {
        setEvents(prev =>
            prev.map(e => e.id === selectedEvent.id ? selectedEvent : e)
        );
        setShowModal(false);
    };

    const handleDelete = () => {
        setEvents(prev => prev.filter(e => e.id !== selectedEvent.id));
        setShowModal(false);
    };

    return (
        <div className="calendar-container">
            
            <div id="left-column">
                <header>
                    <img className="dashboard-logo" src="images/scLogo2.JPG" alt="dashboard-logo" />
                </header>

                <nav>
                    <Link className="calendar" to="/dashboard">
                        <button>Dashboard</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="calendar" to="/tasks">
                        <button>Tasks</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="calendar" to="/notes">
                        <button>Notes</button>
                    </Link>
                    <br />
                    <br />
                    <button className="calendar-select active">
                        Calendar
                    </button>
                    <br />
                    <br />
                    <Link className="calendar" to="/chat">
                        <button>Chat</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="calendar" to="/notifications">
                        <button>Notifications {notifications.length > 0 && (
                         <span className="notification-badge">{notifications.length}</span>
                         )}</button>
                    </Link>
                    <br />
                    <br />
                    <Link className="calendar" to="/settings">
                        <button>Settings</button>
                    </Link>
                </nav>
            </div>

            {/* Main Content Area */}
            <div id="calendar-page">
           
            <header className="calendar-header">
                <h1>Calendar</h1>
                </header>
            <div className="calendar-wrapper">
                
                    <div className="calendar-wrapper">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        editable={true}
                        selectable={true}
                        select={handleEventAdd}
                        eventClick={handleEventClick}
                        events={events.map(event => ({
                            ...event,
                            title: `${event.title} (${event.subject})`
                        }))}
                    />
                </div>

                {showModal && selectedEvent && (
                <section className="modal-container" id="modal">
                    <section className="calendar-modal">
                        <button onClick={() => setShowModal(false)} className="close-btn" id="close">x</button>
                        <div className="modal-content">
                            <h1>Event</h1>
                            <form className="modal-form" onSubmit={(e) => {
                                e.preventDefault();
                                handleSave();
                            }}>
                            <div>
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    id="title"
                                    value={selectedEvent.title}
                                    onChange={(e) =>
                                        setSelectedEvent({ ...selectedEvent, title: e.target.value })
                                    }
                                /><br />

                                <label htmlFor="subject">Subject:</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    id="subject"
                                    value={selectedEvent.subject}
                                    onChange={(e) =>
                                        setSelectedEvent({ ...selectedEvent, subject: e.target.value })
                                    }
                                /><br />

                                <label htmlFor="description">Description:</label><br />
                                <textarea
                                    className="event-description-input"
                                    id="description"
                                    value={selectedEvent.description}
                                    onChange={(e) =>
                                        setSelectedEvent({ ...selectedEvent, description: e.target.value })
                                    }
                                /><br />

                                <div className="modal-buttons">
                                    <button type="submit" className="save-event">Save</button>
                                    <button type="button" className="delete-event" onClick={handleDelete}>Delete</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        )}
            </div>
                                   
            </div>
            
        </div>
    );
};

export default Calendar;