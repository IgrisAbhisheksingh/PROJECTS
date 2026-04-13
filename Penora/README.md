# Penora

Penora is a secure and user-friendly personal journaling app built with the MERN stack (MongoDB, Express, React, and Node.js). It allows users to easily log in, write, view, and manage their daily entries while ensuring a seamless, distraction-free, and private experience. Prioritizing simplicity, security,and privacy,Penora helps you document your thoughts and memories with confidence and peace of mind.

 
 

---

## 📚 Table of Contents

1. [**Features**](#1-features)
2. [**Tech Stack**](#2-tech-stack)
3. [**Project Structure**](#3-project-structure)
4. [**Installation**](#4-installation)
   - [**Backend Setup**](#backend-setup)
   - [**Frontend Setup**](#frontend-setup)
5. [**API Endpoints**](#5-api-endpoints)
6. [**Contributing**](#6-contributing)

---

## 1. Features

- **User Authentication:** Secure login and registration system.
- **Journal Entries:** Create, read, update, and delete personal daily entries.
- **Responsive UI:** Built with React for a smooth user experience.
- **RESTful API:** Powered by Express and Node.js for backend operations.
- **Data Persistence:** MongoDB used to store user data and journal entries securely.

---

## 2. Tech Stack

- **Frontend**: React.js with TailwindCSS & DaisyUI for modern, responsive UI design.
- **Backend**: Node.js with Express.js for handling server-side logic and API requests.
- **Authentication**: JWT (JSON Web Tokens) with HTTP-only secure cookies for safe and efficient user authentication.
- **Database**: MongoDB with Mongoose for schema validation and seamless database interactions.
- **State Management & API Calls**: Redux Toolkit (RTK) and RTK Query for efficient state management, data fetching, and caching.
- **Deployment**: Vercel for seamless deployment and hosting of the live demo.

---

## 3. Project Structure

The repository is divided into two main directories:

```
daybook/
├── backend/                                # All the server files
│   ├── src/                                # Source code for the backend
│   │   ├── config/                         # Configuration file for database
│   │   │   └── database.js                 # Database connection setup
│   │   ├── controllers/                    # Handles request and business operations
│   │   │   ├── authController.js           # Handles auth logic (signup, login, logout, password)
│   │   │   ├── userController.js           # Handles user-related operations (view profile, updates)
│   │   │   └── entryController.js          # Handles entry ops (create, read, update, search, delete)
│   │   ├── middleware/                     # Middleware file for authentication
│   │   │   └── authMiddleware.js           # Middleware for authentication and authorization
│   │   ├── models/                         # Database models (schema definitions)
│   │   │   ├── entryModel.js               # Defines the structure of daybook entries
│   │   │   └── userModel.js                # Defines the structure of user data
│   │   ├── routes/                         # Files for API routes for the backend
│   │   │   ├── authRoutes.js               # Routes related to authentication
│   │   │   ├── entryRoutes.js              # Routes for daybook entry operations
│   │   │   └── userRoutes.js               # Routes for user-related operations
│   │   ├── utils/                          # Utility/helper functions
│   │   │   └── generateToken.js            # To generate JSON Web Tokens (JWTs) and response cookies
│   │   └── index.js                        # The main entry point for the Node.js server
│   ├── .env.example                        # Example environment variable file
│   ├── .gitignore                          # Specifies files and directories to be ignored by Git
│   ├── package-lock.json                   # Records the exact versions of installed npm packages
│   └── package.json                        # Defines project metadata and dependencies
│
├── frontend/                               # React.js client-side code
│   ├── public/                             # Static assets served directly by the browser
│   │   ├── daybook-image.jpg               # Application banner image
│   │   └── logo.svg                        # Application logo for direct serving
│   ├── src/                                # React application's source code
│   │   ├── assets/                         # Static processed assets
│   │   │   └── logo.svg                    # Application logo used in application
│   │   ├── components/                     # Reusable UI components
│   │   │   ├── auth/                       # Authentication-related components
│   │   │   │   ├── Logout.jsx              # Component for user logout confirmation
│   │   │   │   ├── Password.jsx            # Component for changing the password
│   │   │   │   └── Profile.jsx             # Component for user profile display and editing
│   │   │   ├── entry/                      # Journal entry-related components
│   │   │   │   ├── AddEntry.jsx            # Component for adding new entries
│   │   │   │   ├── DeleteEntry.jsx         # Component for deleting entries
│   │   │   │   ├── EditEntry.jsx           # Component for editing entries
│   │   │   │   ├── EntryCard.jsx           # Component for displaying an entry
│   │   │   │   └── ReadMore.jsx            # Component to expand and read full entries
│   │   │   ├── navbar/                     # Navigation bar components
│   │   │   │   ├── Navbar.jsx              # Main navigation bar component
│   │   │   │   ├── NavLinks.jsx            # Navigation links component
│   │   │   │   ├── NavProfile.jsx          # User profile display within the navbar
│   │   │   │   └── SearchBox.jsx           # Search functionality within the navbar
│   │   │   ├── Footer.jsx                  # Application footer component
│   │   │   ├── Layout.jsx                  # Layout component for structuring UI
│   │   │   ├── Loader.jsx                  # Loading indicator component
│   │   │   ├── ModalLayout.jsx             # Modal component for displaying pop-up content
│   │   │   └── ThemeController.jsx         # Component to manage the application's theme
│   │   ├── pages/                          # Application pages (views)
│   │   │   ├── About.jsx                   # About page describing the application
│   │   │   ├── Entries.jsx                 # Page displaying all journal entries
│   │   │   ├── Home.jsx                    # Home page with an overview of the application
│   │   │   ├── Login.jsx                   # Login page where users can enter credentials
│   │   │   └── Signup.jsx                  # Signup page allowing new users to register
│   │   ├── redux/                          # Redux state management files
│   │   │   ├── api/                        # Redux Toolkit Query API slices
│   │   │   │   ├── apiSlice.js             # Base API slice configuration
│   │   │   │   ├── entriesApiSlice.js      # API slice for daybook entries
│   │   │   │   └── usersApiSlice.js        # API slice for user data
│   │   │   ├── features/                   # Redux feature slices
│   │   │   │   └── userSlice.js            # Redux slice for user state management
│   │   │   └── store.js                    # Redux store configuration
│   │   ├── App.css                         # Global CSS styles
│   │   ├── App.jsx                         # Main application component
│   │   └── main.jsx                        # Entry point for the React application
│   ├── .env.example                        # Example environment variable file for the frontend
│   ├── .gitignore                          # Specifies files and directories to be ignored by Git
│   ├── eslint.config.js                    # ESLint configuration file
│   ├── index.html                          # HTML entry point for the React application
│   ├── package-lock.json                   # Records the exact versions of installed npm packages
│   ├── package.json                        # Defines project metadata and dependencies
│   └── vite.config.js                      # Vite build tool configuration
└── README.md                               # Documentation about the project
```

- **backend:** Contains all server-side code including API endpoints, middleware, and database connections.
- **frontend:** Contains all client-side code responsible for the user interface and client logic.

---

## 4. Installation

Follow these steps to set up the project locally:

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/thenileshnishad/daybook.git

   cd daybook/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the `backend` directory and set the variables accordingly:

   ```env
   PORT=3000
   MONGO_URI=mongodb:your
   JWT_SECRET=yourjwt
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the backend server:**

   ```bash
   npm start
   # or
   npm run dev
   ```

### Frontend Setup

1. **Navigate to the root directory (daybook, not backend):**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variable:**

   Create a `.env` file in the `frontend` directory and set the variable accordingly:

   ```
   VITE_BACKEND_URL=http://localhost:3000
   ```

4. **Start the React development server:**

   ```bash
   npm run dev
   ```

The app should now be running locally. `By default`:

- The frontend runs on [http://localhost:5173](http://localhost:5173)
- The backend runs on [http://localhost:3000](http://localhost:3000)

---

 
