# 🚀 Data Science Portfolio — Full Stack

A premium, futuristic Data Science portfolio with React.js frontend, Node.js backend, and MongoDB database.

---

## 📁 Project Structure

```
myportfolio/
├── frontend/                  # React.js + Vite frontend
│   ├── src/
│   │   ├── components/        # All page sections
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── CaseStudy.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── CursorAnimation.jsx
│   │   ├── pages/
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── api/
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── backend/                   # Node.js + Express backend
    ├── models/
    │   ├── Project.js
    │   ├── Message.js
    │   └── Admin.js
    ├── routes/
    │   ├── projects.js
    │   ├── contact.js
    │   └── auth.js
    ├── middleware/
    │   └── auth.js
    ├── server.js
    ├── .env
    └── package.json
```

---

## ⚡ Quick Start

### 1. Clone / Open the project
```bash
cd myportfolio
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Edit `backend/.env` with your credentials:
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/portfolio
JWT_SECRET=your_super_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev    # development (nodemon)
npm start      # production
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit: **http://localhost:5173**

---

## 🔧 First-Time Admin Setup

1. Start the backend server
2. Make a POST request to create the admin:
   ```
   POST http://localhost:5000/api/auth/setup
   ```
   Using curl:
   ```bash
   curl -X POST http://localhost:5000/api/auth/setup
   ```
3. Login at: **http://localhost:5173/admin**
4. In admin panel, click **"Seed Sample Data"** to populate projects

---

## 🌐 API Endpoints

### Projects (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects?category=ML` | Filter by category |
| GET | `/api/projects?search=python` | Search projects |
| GET | `/api/projects/:id` | Get single project |

### Projects (Admin — requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/projects/seed/data` | Seed sample data |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all messages (admin) |
| PATCH | `/api/contact/:id/read` | Mark as read (admin) |
| DELETE | `/api/contact/:id` | Delete message (admin) |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/setup` | Create admin (run once) |
| POST | `/api/auth/login` | Admin login → JWT token |
| GET | `/api/auth/verify` | Verify JWT token |

---

## 🔑 Gmail App Password Setup (for Contact Form)

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Search for **"App passwords"**
4. Create password for **Mail > Other (Portfolio)**
5. Copy the 16-character password to `EMAIL_PASS` in `.env`

---

## 🎨 Personalization Checklist

Open each file and replace the placeholders:

### `frontend/src/components/Hero.jsx`
- [ ] Replace `Your Name` with your real name
- [ ] Replace profile image URL with your photo

### `frontend/src/components/About.jsx`
- [ ] Update bio text
- [ ] Replace profile image URL

### `frontend/src/components/Contact.jsx`
- [ ] Replace `youremail@gmail.com` with your Gmail
- [ ] Replace LinkedIn URL
- [ ] Replace GitHub URL

### `frontend/src/components/Footer.jsx`
- [ ] Replace email, LinkedIn, GitHub links
- [ ] Replace `Your Name`

### `frontend/src/components/Experience.jsx`
- [ ] Update education details (university, years, CGPA)
- [ ] Update internship experience
- [ ] Update certifications

### `backend/.env`
- [ ] Set MongoDB Atlas URI
- [ ] Set Gmail credentials
- [ ] Set strong JWT secret

---

## 🚀 Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Push to GitHub, connect to Vercel
# Set environment variable: VITE_API_URL=https://your-backend.render.com
```

Update `frontend/src/api/index.js`:
```js
const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || '/api' 
});
```

### Backend → Render
1. Create new Web Service on [render.com](https://render.com)
2. Connect your GitHub repo
3. Root Directory: `backend`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables from `.env`

### Database → MongoDB Atlas
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create free cluster
3. Get connection string → paste in `MONGO_URI`
4. Whitelist IP: `0.0.0.0/0` (for Render)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Vite, Framer Motion |
| Styling | Vanilla CSS (custom design system) |
| Charts | Recharts |
| 3D Effects | react-parallax-tilt |
| Icons | react-icons |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Email | Nodemailer + Gmail |
| HTTP | Axios |

---

## 📱 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark futuristic theme with neon glow effects
- ✅ Glassmorphism cards
- ✅ Framer Motion animations
- ✅ Custom animated cursor
- ✅ Typing animation in Hero
- ✅ Parallax ticker strip
- ✅ 3D tilt project cards
- ✅ Interactive Recharts dashboard
- ✅ Search & filter projects
- ✅ Project detail modal
- ✅ Contact form with email notifications
- ✅ JWT-secured admin panel
- ✅ Full project CRUD
- ✅ Messages inbox
- ✅ Sample data seeding
- ✅ SEO meta tags

---
