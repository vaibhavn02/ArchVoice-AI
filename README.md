# ArchVoice AI

## Voice-Based Site Issue Assistant

ArchVoice AI is a voice-enabled issue management system that allows users to create, search, update, and delete site issues using natural language commands.

The application converts voice commands into structured actions and manages site issues through an AI-assisted workflow.

---

# Live Demo

Frontend:
https://archvoice-ai.onrender.com

---

# Features

## Voice Command Processing

Users can give commands like:

- Create water leakage issue in kitchen and assign it to plumber
- Search water issues
- Update ceiling issue
- Delete electrical issue


## Issue Management

The application supports:

✅ Create Issue  
✅ Search Issue  
✅ Update Issue  
✅ Delete Issue  



## Confirmation Workflow

Before performing important actions, the system displays a confirmation card.

Example:

Create Issue:

- Issue Title
- Location
- Assigned Person
- Priority


---

# Tech Stack

## Frontend

- React.js
- Axios
- CSS
- JavaScript


## Backend

- Node.js
- Express.js


## Database

- MySQL



# Deployment Architecture

Frontend:
- React.js application deployed on Render

Backend:
- Node.js + Express REST API deployed on Render

Database:
- MySQL hosted on Aiven

---








# Project Structure

ArchVoice
├── client
│ ├── src
│ │ ├── components
│ │ │ ├── ConfirmationCard.jsx
│ │ │	├── SearchResults.jsx
│ │ │ 	└── IssueList.jsx
│ │ │
│ │ ├── App.jsx
│ │ └── App.css
│
├── server
│ ├── routes
│ │ ├── confirmRoutes.js
│ │ ├── searchRoutes.js
│ │ ├── issueRoutes.js
│ │ ├── voiceRoutes.js
│ │ ├── updateRoutes.js
│ │ └── deleteRoutes.js
│ │
│ ├── ai
│ │ 	 └── commandParser.js
│ ├── config
│ │         └── db.js
│ │
│ ├── testAI.js
│ └── server.js


---



# How It Works

1. User gives a voice command.

Example:

"Create water leakage issue in kitchen and assign it to plumber"


2. Speech Recognition converts voice into text.


3. Backend parser identifies:

- Intent
- Issue title
- Location
- Assigned person


4. System shows confirmation card.


5. After confirmation, issue is stored in database.


6. User can search, update, or delete existing issues.


---

# API Endpoints


## Voice Command
POST    /api/voice/command 


## Create Issue
 POST   /api/issues/confirm 

## Search Issue
GET     /api/search

## Find Update Candidates
POST  	 /api/update/find 

## Confirm Update
POST   /api/update/confirm

## Find Delete Candidates
POST   /api/delete/find

## Confirm Delete
POST   /api/delete/confirm

--- 


# Environment Variables

 Backend requires: 
	DB_HOST=
	DB_USER=
	DB_PASSWORD=
	DB_NAME=
	DB_PORT= 




Environment variables are not included in the repository for security reasons.

---

# Future Improvements

- Better NLP model integration
- User authentication
- Mobile application
- Role-based access
- Issue priority prediction


---
## Browser Support 

Voice commands use the Web Speech API and are tested on Google Chrome desktop. 


# Project By

Vaibhav Ramakant Nikam (vaibhavn02@gmail.com)
