ArchVoice AI
🎙️ Voice-Based Site Issue Management Assistant

ArchVoice AI is an AI-powered voice command system that allows users to manage site issues using natural language commands.

Users can create, search, update, and delete issues using voice instructions instead of manually entering data.

Example:

"Create water leakage issue in kitchen and assign it to plumber"

The system understands the command, extracts required information, and performs the requested operation.

🚀 Features:

✅ Create Issue

Users can create new issues using voice commands.

Example:
Create false ceiling leakage issue in kitchen and assign it to contractor

Extracted information:
Title: false ceiling leakage
Location: kitchen
Assigned To: contractor
Priority: Medium
Status: Pending


🔍 Search Issues
Users can search existing issues.

Example:
Search water issues

The system displays matching issues with:
Issue title
Location
Assigned person
Status


🔄 Update Issue
Users can update issue status using voice commands.

Example:
Update water leakage issue

Workflow:
System finds matching issues
User selects the required issue
Status is updated

Example:
Pending → Completed


🗑️ Delete Issue
Users can remove issues using voice commands.

Example:
Delete electrical issue

Workflow:
System searches matching issues
User selects issue
Confirmation is requested
Issue is deleted


🏗️ Project Architecture
ArchVoice AI

│
├── client
│   ├── React.js
│   ├── Components
│   │      ├── ConfirmationCard
│   │      ├── IssueList
│   │      └── SearchResults
│   │
│   └── Voice Interface
│
│
├── server
│   ├── Node.js
│   ├── Express.js
│   │
│   ├── Routes
│   │      ├── createRoutes
│   │      ├── searchRoutes
│   │      ├── updateRoutes
│   │      └── deleteRoutes
│   │
│   └── MySQL Database
│
└── README.md

🛠️ Technologies Used
Frontend:
React.js
JavaScript
CSS
Axios
Web Speech API

Backend:
Node.js
Express.js

Database:
MySQL

Tools:
VS Code

Git:
GitHub

Postman


🧠 How It Works?
The application follows this workflow:

Voice Command
        |
        ↓
Speech Recognition
        |
        ↓
Command Parser
        |
        ↓
Intent Detection
        |
        |
 --------------------------------
 |        |        |             |
Create  Search  Update       Delete
 |
Database Operation
 |
Confirmation Card
 |
User Action
📋 Supported Voice Commands
Create
Create water leakage issue in kitchen and assign it to plumber
Create electrical problem in bedroom and assign it to electrician
Search
Search water issues
Find electrical issues
Update
Update water leakage issue
Mark electrical issue completed
Delete
Delete water leakage issue
Remove ceiling issue
⚙️ Installation & Setup
1. Clone Repository
git clone https://github.com/yourusername/ArchVoice-AI.git
Backend Setup

Go to server folder:

cd server

Install dependencies:

npm install

Create .env file:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=archvoice
DB_PORT=3306

Start server:

node server.js

Backend runs on:

http://localhost:5000
Frontend Setup

Open another terminal:

cd client

Install dependencies:

npm install

Run React application:

npm run dev

Frontend runs on:

http://localhost:5173
🗄️ Database Structure

Table:

issues

Columns:

Column	Description
id	Unique issue ID
title	Issue name
location	Issue location
assigned_to	Responsible person
priority	Issue priority
status	Current status
created_at	Creation date
🎥 Demo Workflow

Example demonstration:

Create issue
Create water leakage issue in kitchen and assign it to plumber
Search issue
Search water issue
Update issue
Update water leakage issue
Delete issue
Delete water leakage issue
📸 Screenshots

(Add screenshots here)

Example:

screenshots/
|
├── create-card.png
├── search-card.png
├── update-card.png
└── delete-card.png



Possible future enhancements:

AI-based better command understanding
User authentication
Role-based access
Mobile application
Dashboard analytics
Voice response using Text-to-Speech
Cloud deployment

👨‍💻 Author:
Vaibhav Ramakant Nikam
(Computer Engineering Graduate)

Skills:
Java
JavaScript
React
Node.js
MySQL

📜 License
This project is created for learning and demonstration purposes.