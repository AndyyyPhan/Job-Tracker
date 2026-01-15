# 📋 Job Tracker

A full-stack web application for managing job applications with user authentication, built as a learning project to demonstrate CRUD operations, authentication, and modern web development practices.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://job-tracker-psi-two.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🔐 **User Authentication** - Secure signup/login with session-based authentication
- ➕ **Create Jobs** - Add new job applications with company, title, status, date, and notes
- ✏️ **Edit Jobs** - Update application details with a modal interface
- 🗑️ **Delete Jobs** - Remove job entries with confirmation
- 🔍 **Filter by Status** - View jobs by application status (Applied, Interviewing, Offer, Rejected, Accepted)
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Clean interface with Tailwind CSS and smooth animations
- 🔒 **Private & Secure** - Users can only view and manage their own jobs

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Supabase** - Database hosting
- **bcrypt** - Password hashing
- **express-session** - Session management
- **validator** - Input validation

### Deployment
- **Vercel** - Hosting platform (frontend + serverless backend)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account (for database)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/job-tracker.git
   cd job-tracker
```

2. **Install dependencies**
```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
```

3. **Set up environment variables**

   **Backend** (`server/.env`):
```env
   DATABASE_URL=your_supabase_connection_string
   SESSION_SECRET=your_random_secret_here
   PORT=8000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
```

   **Frontend** (`client/.env.development`):
```env
   VITE_API_URL=http://localhost:8000
```

4. **Set up the database**

   Run this SQL in your Supabase SQL editor:
```sql
   -- Create statuses table
   CREATE TABLE statuses (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL
   );

   -- Insert status options
   INSERT INTO statuses (name) VALUES 
     ('Applied'),
     ('Interviewing'),
     ('Rejected'),
     ('Offer'),
     ('Accepted');

   -- Create users table
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     username VARCHAR(50) UNIQUE NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Create jobs table
   CREATE TABLE jobs (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
     company_name TEXT NOT NULL,
     job_title TEXT NOT NULL,
     status_id INTEGER REFERENCES statuses(id) ON DELETE RESTRICT,
     application_date DATE NOT NULL,
     notes TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
```

5. **Start the development servers**

   **Terminal 1 - Backend:**
```bash
   cd server
   npm start
```

   **Terminal 2 - Frontend:**
```bash
   cd client
   npm run dev
```

6. **Open your browser**
```
   http://localhost:5173
```

## 📁 Project Structure
```
job-tracker/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── EditJobForm.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── JobCard.jsx
│   │   │   ├── JobForm.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── SignupForm.jsx
│   │   │   └── StatusFilter.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                 # Backend Express application
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   └── jobsController.js
|   |   └── meController.js
|   |   └── statusesController.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── jobs.js
│   │   ├── me.js
│   │   └── statuses.js
│   ├── middleware/        # Custom middleware
│   │   └── requireAuth.js
│   ├── db.js             # Database connection
│   ├── server.js         # Express app setup
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Jobs
- `GET /api/jobs` - Get all jobs for authenticated user
- `GET /api/jobs?status={id}` - Filter jobs by status
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Me
- `GET /api/auth/me` - Get current user info

### Statuses
- `GET /api/statuses` - Get all available statuses

## 🎨 Design Features

- **Gradient Header** - Blue gradient with sticky positioning
- **Status Badges** - Color-coded status indicators (Applied, Interviewing, Offer, Rejected, Accepted)
- **Hover Effects** - Cards lift with shadow on hover
- **Modal Interface** - Smooth modal for editing jobs with backdrop blur
- **Responsive Grid** - Adapts from 1 column (mobile) to 3 columns (desktop)
- **Form Validation** - Client-side and server-side validation
- **Loading States** - Visual feedback during API calls

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- Session-based authentication with HTTP-only cookies
- CSRF protection with SameSite cookies
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- User data isolation (users can only access their own data)

## 🧪 Testing

**Manual testing checklist:**

- [ ] User signup with validation
- [ ] User login/logout
- [ ] Session persistence across page refresh
- [ ] Create job application
- [ ] Edit job application
- [ ] Delete job with confirmation
- [ ] Filter by status
- [ ] Responsive design on mobile/tablet/desktop

## 📝 Lessons Learned

This project was built as a learning experience in full-stack development. Key concepts practiced:

- RESTful API design
- Database schema design and relationships
- User authentication and authorization
- Session management
- Frontend state management with React hooks
- Environment variable management
- Deployment to production
- Git version control

## 🤝 Contributing

This is a personal learning project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**

- GitHub: [@AndyyyPhan](https://github.com/AndyyyPhan)
- LinkedIn: [Andy Phan](https://linkedin.com/in/andyyyphan)

## 🙏 Acknowledgments

- Built as part of a take-home assessment
- Inspired by modern job application tracking needs
- Thanks to the open-source community for excellent tools and libraries

---

⭐ If you found this project helpful, please consider giving it a star!
