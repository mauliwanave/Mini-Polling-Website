# Mini-Polling-Website
Mini Polling Application

A full-stack Mini Polling Application where admins can create polls and users can vote and view results.
This project demonstrates end-to-end development using React, Node.js, Express, and JSON Server.

Project Overview

The application allows:

Admins to create and manage polls

Users to vote on active polls

Prevention of duplicate voting

Display of poll results with vote percentages

This project was built as part of a Full-Stack Developer Assessment.

Tech Stack

Frontend:

React.js

Material UI (MUI)

React Router DOM

Axios

Backend:

Node.js

Express.js

JSON Server (Mock Database)

Project Structure

mini-polling-app/

backend/

controllers/

pollController.js

routes/

pollRoutes.js

db.json

server.js

package.json

frontend/

src/

components/

Navbar.js

pages/

PollList.js

PollDetail.js

CreatePoll.js

Results.js

AdminDashboard.js

services/

api.js

App.js

index.js

package.json

README.md

Database Structure (db.json)

{
"polls": [],
"options": [],
"votes": []
}

polls: Stores poll metadata

options: Stores options linked to polls

votes: Stores user votes (with IP)

Features

User Features:

View active polls

Vote on polls

View results with percentage bars

Vote only once per poll

Admin Features:

Create new polls

Add multiple options dynamically

View poll results

Delete polls

Close polls using isActive flag

API Endpoints

GET /polls
Get all active polls

GET /polls/:id
Get poll details

POST /polls
Create a new poll

POST /polls/:id/vote
Vote on a poll

GET /polls/:id/results
Get poll results

Setup Instructions

Clone Repository

git clone <your-github-repo-url>
cd mini-polling-app

Backend Setup

cd backend
npm install

Start JSON Server (Mock Database):

npx json-server --watch db.json --port 3001

Start Express Server:

npm run dev

Backend runs on:
http://localhost:5000

Frontend Setup

cd frontend
npm install
npm start

Frontend runs on:
http://localhost:3000

How to Use

Admin:

Go to /create or /admin

Create a poll with at least 2 options

Manage polls from Admin Dashboard

User:

View polls on homepage

Vote on active polls

View results after voting

Assumptions Made

JSON Server is used instead of a SQL database

IP-based voting restriction is implemented

No authentication (admin access is route-based)

Frontend handles basic validation

Future Improvements

Admin authentication

Role-based access control

Real database integration (MongoDB / SQL)

Poll analytics dashboard
