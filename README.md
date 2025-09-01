# FeedForward Backend

The backend API for FeedForward, built with **Node.js**, **Express**, and **MongoDB**.

## Features

- RESTful API for feedback CRUD operations
- Upvote and delete feedback items
- Group feedback by category (Bug, Feature, Improvement)
- CORS support for frontend integration
- Future improvement: JWT authentication for restricted actions

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or cloud)

### Installation

```bash
npm install
```

### Running the API

```bash
npm run dev
```

The API will start on [http://localhost:5000](http://localhost:5000) by default.

## Project Structure

```
backend/
  ├── src/
  │   ├── index.js
  │   ├── config/
  │   │   └── db.js
  │   ├── models/
  │   │   └── Feedback.js
  │   ├── routes/
  │   │   └── feedback.js
  ├── .env
  ├── package.json
  └── README.md
```

## Environment Variables

Create a `.env` file in the backend folder:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/feedforward
JWT_SECRET=your_jwt_secret--- (future improvemnet)
```

## Future Improvements

- Enhance upvote functionality to support toggling and user tracking
- Add more robust error handling and validation
- Implement user authentication and feedback history
- Add automated tests

## Notes

This backend was written to support the FeedForward frontend.
This project was entirely written by me without the use of AI tools.



**Built with Node.js, Express, MongoDB.