Motor Data Management API
This is a Node.js API built with Express.js and MySQL to manage motor-related data and system indicators. The API provides endpoints to interact with motor data (such as battery percentage, power consumption, motor speed) and system indicators (with status updates). It supports basic CRUD operations and utilizes MySQL as the database.

Features:
Motor Data Management: Update and retrieve motor data, including battery percentage, power consumption, RPM, and charging state.
Indicators: Fetch and update system indicators by ID.
CORS Support: Configured for frontend communication from http://localhost:3000 (customizable).
Environment Variables: Uses .env file for secure storage of sensitive database credentials.
API Endpoints:
GET /api/indicators: Fetch all indicators.
GET /api/indicators/id/:id: Fetch a specific indicator by ID.
PUT /api/indicators/id/:id: Update the status of a specific indicator.
GET /api/motor-data: Fetch the motor data.
PUT /api/motor-data: Update motor data (battery percentage, power consumption, etc.).
PUT /api/motor-speed: Update motor speed (RPM).
PUT /api/motor-power: Update motor power consumption.
PUT /api/charging-state: Toggle charging state.
Technologies:
Node.js
Express.js
MySQL
CORS
dotenv
Setup:
Clone this repository.
Install dependencies:
bash
Copy code
npm install
Create a .env file and set your database credentials:
text
Copy code
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
Start the server:
bash
Copy code
npm start
The API will be running on http://localhost:5000.
