//Task.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Ensure the tasks table exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      subject TEXT NOT NULL,
      date TEXT NOT NULL,
      description TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      overdue INTEGER DEFAULT 0,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

db.run(`ALTER TABLE tasks ADD COLUMN overdue INTEGER DEFAULT 0`, (err) => {
  if (err && !err.message.includes("duplicate column")) {
    console.error("Error adding 'overdue' column:", err.message);
  }
});


const Task = {
  // Get all tasks for a user
  getAll: (userId) => {
    return Task.findByUser(userId);
  },

  findByUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM tasks WHERE user_id = ?`,
        [userId],
        (err, rows) => {
          if (err) {
            console.error('Error fetching tasks:', err);
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  },
/*
  // Create a new task
  create: ({ userId, title, subject, date, description }) => {
    return new Promise((resolve, reject) => {
      console.log('Creating task with data:', { userId, title, subject, date, description });

      db.run(
        `INSERT INTO tasks (user_id, title, subject, date, description, completed, overdue)
         VALUES (?, ?, ?, ?, ?, 0,?)`,
        [userId, title, subject, date, description, isOverdue],
        function (err) {
          if (err) {
            console.error('Error inserting task:', err);
            reject(err);
          } else {
            console.log('Task saved with ID:', this.lastID);
            resolve({
              id: this.lastID,
              userId,
              title,
              subject,
              date,
              description,
              completed: 0
            });
          }
        }
      );
    });
  },
*/

create: ({ userId, title, subject, date, description }) => {
  return new Promise((resolve, reject) => {
    console.log('Creating task with data:', { userId, title, subject, date, description });

    // Determine if the task is overdue
    const taskDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize for date-only comparison

    const isOverdue = taskDate < today ? 1 : 0;

    db.run(
      `INSERT INTO tasks (user_id, title, subject, date, description, completed, overdue)
       VALUES (?, ?, ?, ?, ?, 0, ?)`,
      [userId, title, subject, date, description, isOverdue],
      function (err) {
        if (err) {
          console.error('Error inserting task:', err);
          reject(err);
        } else {
          console.log('Task saved with ID:', this.lastID);
          resolve({
            id: this.lastID,
            userId,
            title,
            subject,
            date,
            description,
            completed: 0,
            overdue: isOverdue
          });
        }
      }
    );
  });
},

  // Update an existing task
  /*
  update: (id, { title, subject, date, description }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE tasks SET title = ?, subject = ?, date = ?, description = ? WHERE id = ?`,
        [title, subject, date, description, id],
        function (err) {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
*/

update: (id, { title, subject, date, description }) => {
  return new Promise((resolve, reject) => {
    const taskDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isOverdue = taskDate < today ? 1 : 0;

    db.run(
      `UPDATE tasks SET title = ?, subject = ?, date = ?, description = ?, overdue = ? WHERE id = ?`,
      [title, subject, date, description, isOverdue, id],
      function (err) {
        if (err) {
          console.error("Error updating task:", err);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
},


  // Mark task as complete
  /*
  markComplete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE tasks SET completed = 1 WHERE id = ?`,
        [id],
        function (err) {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
  */
  markComplete: (id) => {
    return new Promise((resolve, reject) => {
      // Get the task's due date
      db.get(`SELECT date FROM tasks WHERE id = ?`, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          const taskDate = new Date(row.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
  
          const isOverdue = taskDate < today ? 1 : 0;
  
          // Update completed and overdue status
          db.run(
            `UPDATE tasks SET completed = 1, overdue = ? WHERE id = ?`,
            [isOverdue, id],
            function (err) {
              if (err) reject(err);
              else resolve();
            }
          );
        }
      });
    });
  },

  // Mark task as overdue

markOverdue: (id) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE tasks SET overdue = 1 WHERE id = ?`,
      [id],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
},

  // Delete a task
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM tasks WHERE id = ?`,
        [id],
        function (err) {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }
};

module.exports = Task;