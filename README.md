# Event Management Backend

A Node.js backend service for managing events with user authentication and CRUD operations.

## Features

- **User Authentication**: Register and login with email/password
- **Event Management**: Create, read, update, and delete events
- **Token-based Authorization**: JWT-like token system for secure API access
- **MongoDB Integration**: Cloud-based MongoDB Atlas database
- **CORS Enabled**: Cross-origin resource sharing support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB Atlas
- **Authentication**: Custom token-based system
- **Environment**: dotenvx for configuration
- **Development**: Nodemon for auto-restart

## API Endpoints

### Authentication Routes (`/api/user`)

- `POST /save-user` - Register a new user
- `POST /login` - User login

### Event Routes (`/api/event`)

- `POST /add-event` - Create a new event (requires authentication)
- `GET /events` - Get all events
- `GET /events/:email` - Get events for specific user (requires authentication)
- `PATCH /events/:id` - Update an event
- `DELETE /events/:id` - Delete an event (requires authentication)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm
- MongoDB Atlas account

### Installation

1. Clone the repository:

   ```bash
   cd event-manage-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

   ```
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The server will start on port 5000 (or the port specified in your environment variables).

## Project Structure

```
event-manage-backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection configuration
│   ├── middlewares/
│   │   └── verifyToken.js     # Authentication middleware
│   └── routes/
│       ├── userAuthRoute.js   # User authentication routes
│       └── addEventRoute.js   # Event management routes
├── server.js                  # Main server file
├── package.json
└── README.md
```

## Database Schema

### Users Collection

- `name`: User's full name
- `email`: User's email address (unique)
- `password`: SHA-256 hashed password
- `photoURL`: User's profile picture URL
- `token`: Authentication token
- `createdAt`: Account creation timestamp

### Events Collection

- `organizerName`: Event organizer's name
- `title`: Event title
- `description`: Event description
- `date`: Event date
- `time`: Event time
- `location`: Event location
- `userEmail`: Email of the user who created the event
- `attendeeCount`: Total Attendees for events
- `createdAt`: Event creation timestamp

## Security Features

- Password hashing using crypto
- Token-based authentication
- Protected routes with middleware
- Input validation for required fields
- CORS configuration for cross-origin requests

## Development

The project uses nodemon for development, which automatically restarts the server when files change.

```bash
npm start  # Starts development server with nodemon
```
