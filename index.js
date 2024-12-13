require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to the MySQL database.");
});

// Get indicators
app.get("/api/indicators", (req, res) => {
    db.query("SELECT * FROM indicators", (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

// GET /api/indicators/id/:id
app.get("/api/indicators/id/:id", (req, res) => {
    const { id } = req.params; // Extract the id parameter from the URL
    
    // SQL query to fetch the specific indicator by id
    db.query("SELECT * FROM indicators WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.error("Error fetching indicator by id:", err);
        return res.status(500).json({ message: "Server error", error: err });
      }
  
      // If no matching record is found
      if (results.length === 0) {
        return res.status(404).json({ message: `No indicator found with id ${id}` });
      }
  
      // Return the result (assumes only one result for the given id)
      res.status(200).json(results[0]);
    });
  });
  
  
// PUT API to update a specific indicator status
app.put('/api/indicators/id/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    // Validate status input (optional, depending on your needs)
    if (status !== 0 && status !== 1) {
      return res.status(400).json({ message: "Invalid status. Status must be 0 or 1." });
    }
  
    // SQL query to update the indicator's status by ID
    const query = "UPDATE indicators SET status = ? WHERE id = ?";
  
    db.query(query, [status, id], (err, results) => {
      if (err) {
        console.error("Error updating indicator status:", err);
        return res.status(500).json({ message: "Server error", error: err });
      }
  
      // Check if any row was updated (affectedRows > 0)
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: `Indicator with id ${id} not found.` });
      }
  
      // Return a success response with the updated indicator info
      res.status(200).json({
        message: `Indicator with id ${id} updated successfully.`,
        indicator: { id, status } // You can include more details if needed
      });
    });
  });
  





// Get motor data
app.get("/api/motor-data", (req, res) => {
    db.query("SELECT * FROM motor_data", (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results[0]);
    });
});


// Update motor data (battery percentage and other fields)
app.put("/api/motor-data", (req, res) => {
    const { battery_percentage } = req.body;
    const  { battery_temperature } = req.body;
    const { power_consumption } = req.body;


    db.query(
      "UPDATE motor_data SET power_consumption = ?, battery_percentage = ?, battery_temperature = ? WHERE id = 1",
      [power_consumption, battery_percentage, battery_temperature],
      (err) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.json({ success: true });
      }
    );
  });

// Update motor speed
app.put("/api/motor-speed", (req, res) => {
    const { rpm } = req.body;

    db.query(
        "UPDATE motor_data SET rpm = ?",
        [rpm],
        (err) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({ success: true });
        }
    );
});


// Update motor power
app.put("/api/motor-power", (req, res) => {
    const { powerConsumption } = req.body;

    db.query(
        "UPDATE motor_data SET power_consumption = ?",
        [powerConsumption],
        (err) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({ success: true });
        }
    );
});




// Toggle charging state
app.put("/api/charging-state", (req, res) => {
    const { charging_state } = req.body;

    db.query(
        "UPDATE motor_data SET charging_state = ?, rpm = 0",
        [charging_state],
        (err) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({ success: true });
        }
    );
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
