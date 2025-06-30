# Event Manage Backend

This is a backend service for managing events, built with Node.js and Express.

## Features

- User authentication
- Event management (create, update, delete, list events)
- MongoDB integration

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jubayerahmmad/event-management-backend
   cd event-manage-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your MongoDB connection in `src/config/db.js`.

### Running the Server

```bash
node server.js
```

The server will start on the default port (e.g., 5000).

## Project Structure

```
event-manage-backend/
  ├── src/
  │   ├── config/
  │   │   └── db.js
  │   └── routes/
  │       └── userAuthRoute.js
  ├── server.js
  ├── package.json
  └── README.md
```
