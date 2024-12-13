# Motor Data Management API
This is a Node.js API built with Express.js and MySQL to manage motor-related data and system indicators. The API provides endpoints to interact with motor data (such as battery percentage, power consumption, motor speed) and system indicators (with status updates). It supports basic CRUD operations and utilizes MySQL as the database.

# Features:
Motor Data Management: Update and retrieve motor data, including battery percentage, power consumption, RPM, and charging state.

Indicators: Fetch and update system indicators by ID.

CORS Support: Configured for frontend communication from http://localhost:3000 (customizable).

Environment Variables: Uses .env file for secure storage of sensitive database credentials.

# API Endpoints:
GET /api/indicators: Fetch all indicators.

GET /api/indicators/id/:id: Fetch a specific indicator by ID.

PUT /api/indicators/id/:id: Update the status of a specific indicator.

GET /api/motor-data: Fetch the motor data.

PUT /api/motor-data: Update motor data (battery percentage, power consumption, etc.).

PUT /api/motor-speed: Update motor speed (RPM).

PUT /api/motor-power: Update motor power consumption.

PUT /api/charging-state: Toggle charging state.

# Technologies:
Node.js

Express.js

MySQL

CORS

dotenv

# Setup:
Clone this repository.

Install dependencies:

npm install

Create a .env file and set your database credentials:

DB_HOST=your-database-host

DB_USER=your-database-username

DB_PASSWORD=your-database-password

DB_NAME=your-database-name

Start the server:

npm start

The API will be running on http://localhost:5000.

In order to make it properly work MySQL Database has to be setup in local with indicators and motor_data tables in vehicle_dashboard database.

This is for indicators table

CREATE TABLE indicators (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,         -- Name of the indicator
    status TINYINT(1) NOT NULL DEFAULT 0, -- Status of the indicator (0 or 1)
);

This is for motor_data table

CREATE TABLE motor_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    battery_percentage INT,   -- Battery percentage (0-100)
    battery_temperature FLOAT,           -- Battery temperature (in Celsius)
    power_consumption FLOAT,            -- Power consumption (in Watts or other unit)
    rpm INT,                                     -- Motor speed in RPM
    charging_state TINYINT(1) NOT NULL DEFAULT 0, -- Charging state (0 for not charging, 1 for charging)
    gear_ratio FLOAT 
);




