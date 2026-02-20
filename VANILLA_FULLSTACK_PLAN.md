# 🚀 ScrollStory - Vanilla JS Full-Stack SaaS Architecture

## 📋 Overview
Build a complete production-ready SaaS platform using **vanilla HTML5, CSS3, JavaScript** with the same premium animations, design, and feel as the current landing page.

---

## 🏗️ Tech Stack (No Frameworks!)

### Frontend
- **HTML5** - Multi-page structure with templates
- **CSS3** - All styling, animations, glassmorphism
- **Vanilla JavaScript (ES6+)** - All logic and interactions
- **GSAP 3.13.0** - Animations (keep current)
- **Locomotive Scroll 3.5.4** - Smooth scrolling (keep current)
- **Canvas API** - Frame animations (keep current)

### Backend
- **Node.js + Express** - API server
- **PostgreSQL** - Database
- **Redis** - Sessions & caching
- **JWT** - Authentication
- **Stripe** - Payments

### Additional Tools
- **Webpack/Vite** - Module bundling (optional)
- **EJS/Handlebars** - Server-side templating (optional)
- **Nodemailer** - Email service
- **Multer** - File uploads
- **Socket.io** - Real-time features (optional)

---

## 📁 Project Structure

```
scrollstory-saas/
├── public/                          # Static frontend files
│   ├── index.html                   # Landing page (current)
│   ├── pricing.html                 # Pricing page
│   ├── features.html                # Features page
│   ├── about.html                   # About page
│   ├── contact.html                 # Contact page
│   ├── login.html                   # Login page
│   ├── signup.html                  # Signup page
│   ├── dashboard.html               # User dashboard
│   ├── editor.html                  # Story editor
│   ├── settings.html                # User settings
│   ├── admin.html                   # Admin panel
│   │
│   ├── css/
│   │   ├── main.css                 # Global styles (from current style.css)
│   │   ├── components.css           # Reusable components
│   │   ├── pages.css                # Page-specific styles
│   │   ├── animations.css           # Animation styles
│   │   └── responsive.css           # Media queries
│   │
│   ├── js/
│   │   ├── main.js                  # Core functionality (from current script.js)
│   │   ├── router.js                # Client-side routing
│   │   ├── auth.js                  # Authentication logic
│   │   ├── api.js                   # API calls
│   │   ├── animations.js            # GSAP animations
│   │   ├── canvas.js                # Canvas animations
│   │   ├── editor.js                # Story editor logic
│   │   ├── dashboard.js             # Dashboard logic
│   │   ├── utils.js                 # Helper functions
│   │   └── components.js            # Reusable JS components
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── fonts/
│   │   ├── frames/                  # Canvas frames (keep current)
│   │   ├── bridges/                 # Canvas frames (keep current)
│   │   ├── scrollstory-logo.svg     # Logo (keep current)
│   │   └── favicon.svg              # Favicon (keep current)
│   │
│   └── templates/                   # HTML templates/components
│       ├── header.html
│       ├── footer.html
│       ├── nav.html
│       └── loading.html
│
├── server/                          # Backend
│   ├── config/
│   │   ├── database.js
│   │   ├── redis.js
│   │   └── stripe.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── projectController.js
│   │   ├── paymentController.js
│   │   └── adminController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Subscription.js
│   │   ├── Payment.js
│   │   └── Template.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── projects.js
│   │   ├── payments.js
│   │   └── admin.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── rateLimit.js
│   │
│   ├── services/
│   │   ├── emailService.js
│   │   ├── storageService.js
│   │   └── analyticsService.js
│   │
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── bcrypt.js
│   │   └── validators.js
│   │
│   └── server.js                    # Main server file
│
├── database/
│   ├── migrations/
│   └── seeds/
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🎯 Implementation Phases

### Phase 1: Multi-Page Setup (Week 1)
**Goal**: Convert single page to multi-page structure

**Tasks**:
1. Create all HTML pages (pricing, features, about, contact, login, signup, dashboard, editor, settings)
2. Extract common components (header, footer, nav, loading)
3. Setup CSS architecture (split into multiple files)
4. Create JavaScript modules (auth, api, utils, components)
5. Implement client-side routing (optional - for SPA feel)
6. Maintain all current animations on each page

**Pages to Create**:
- ✅ `index.html` - Landing page (already done)
- 🆕 `pricing.html` - Pricing tiers with animated cards
- 🆕 `features.html` - Detailed features showcase
- 🆕 `about.html` - Company story
- 🆕 `contact.html` - Contact form
- 🆕 `login.html` - User login
- 🆕 `signup.html` - User registration
- 🆕 `dashboard.html` - User dashboard
- 🆕 `editor.html` - Story editor
- 🆕 `settings.html` - Account settings
- 🆕 `admin.html` - Admin panel

### Phase 2: Backend Setup (Week 1-2)
**Goal**: Create API server and database

**Tasks**:
1. Initialize Node.js + Express server
2. Setup PostgreSQL database
3. Create database schema (users, projects, subscriptions, payments)
4. Setup Redis for sessions
5. Create API endpoints structure
6. Implement error handling
7. Setup environment variables

**Required npm packages**:
```json
{
  "express": "^4.18.0",
  "pg": "^8.11.0",
  "redis": "^4.6.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.3.0",
  "cors": "^2.8.5",
  "helmet": "^7.1.0",
  "express-rate-limit": "^7.1.0",
  "express-validator": "^7.0.0",
  "nodemailer": "^6.9.0",
  "stripe": "^14.9.0",
  "multer": "^1.4.0",
  "uuid": "^9.0.0"
}
```

### Phase 3: Authentication System (Week 2)
**Goal**: Complete user auth flow

**Frontend (Vanilla JS)**:
- Login form with validation
- Signup form with validation
- Password reset flow
- Token storage (localStorage/sessionStorage)
- Protected route handling
- Auto-logout on token expiry

**Backend**:
- User registration endpoint
- Login endpoint
- Password reset endpoint
- Email verification
- JWT token generation
- Session management with Redis

### Phase 4: Dashboard (Week 2-3)
**Goal**: User dashboard with project management

**Features**:
- Project cards with thumbnails
- Create new project button
- Edit/Delete project actions
- Usage statistics
- Recent activity
- Quick actions
- Maintain premium animations

### Phase 5: Story Editor (Week 3-5)
**Goal**: Visual editor for creating scroll stories

**Features**:
- Section templates (hero, text, canvas, cards, etc.)
- Drag-and-drop sections
- Text editor (contenteditable)
- Image uploader
- Animation selector
- Canvas frame uploader
- Preview mode
- Save/Publish functionality
- Export HTML/CSS/JS

**Key Challenge**: Build this with vanilla JS (no React)
**Solution**: Use Web Components or vanilla JS classes

### Phase 6: Payment Integration (Week 5)
**Goal**: Stripe subscription system

**Features**:
- Pricing page with animated cards
- Checkout flow
- Subscription management
- Invoice history
- Payment method management
- Webhook handling

### Phase 7: Additional Pages (Week 6)
**Goal**: Complete all marketing pages

**Pages**:
- Pricing page (animated pricing cards)
- Features page (detailed feature showcase)
- About page (company story)
- Contact page (contact form)
- Blog listing (optional)

### Phase 8: Admin Panel (Week 6-7)
**Goal**: Admin dashboard

**Features**:
- User management
- Project moderation
- Analytics dashboard
- System settings
- Template management

### Phase 9: Polish & Optimization (Week 7-8)
**Goal**: Production-ready

**Tasks**:
- Performance optimization
- SEO optimization
- Accessibility audit
- Cross-browser testing
- Mobile responsiveness
- Security hardening
- Error handling
- Loading states

### Phase 10: Deployment (Week 8)
**Goal**: Deploy to production

**Tasks**:
- Setup hosting (Vercel/Netlify for frontend, Railway/Render for backend)
- Configure domain
- Setup SSL
- Configure CDN
- Setup monitoring
- Setup backups

---

## 🎨 Design Consistency

**Maintain across all pages**:
- Dark theme (#000 background)
- Blue gradient accents (#1863ff to #0b48ed)
- Gilroy typography
- Glassmorphism effects
- 3D animations
- Premium loading animation
- Smooth scroll (Locomotive)
- GSAP animations
- Canvas animations (where applicable)

---

## 🔐 Authentication Flow (Vanilla JS)

### Login Flow
```javascript
// login.js
async function handleLogin(email, password) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/dashboard.html';
    }
  } catch (error) {
    showError('Login failed');
  }
}
```

### Protected Routes
```javascript
// auth.js
function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
}

// On dashboard.html, editor.html, settings.html
if (!checkAuth()) {
  // Redirect handled in checkAuth
}
```

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  subscription_tier VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  content JSONB,
  thumbnail_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  stripe_subscription_id VARCHAR(255),
  plan VARCHAR(50),
  status VARCHAR(50),
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update current user
- `DELETE /api/users/me` - Delete account

### Projects
- `GET /api/projects` - Get user's projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/publish` - Publish project

### Payments
- `POST /api/payments/create-checkout` - Create Stripe checkout
- `POST /api/payments/webhook` - Stripe webhook
- `GET /api/payments/invoices` - Get user invoices
- `POST /api/payments/cancel-subscription` - Cancel subscription

---

## 💡 Key Technical Decisions

1. **No Framework**: Pure vanilla JS for maximum control and performance
2. **Multi-Page**: Traditional multi-page app (not SPA) for better SEO
3. **Optional Client-Side Routing**: Can add for SPA feel without full framework
4. **Component System**: Create reusable JS classes/functions for components
5. **Module Pattern**: Use ES6 modules for code organization
6. **Progressive Enhancement**: Works without JS, enhanced with JS
7. **Keep Current Animations**: All GSAP and Locomotive Scroll animations stay

---

## 📝 Next Steps

1. ✅ Push current work to GitHub (DONE)
2. 🔄 Start Phase 1: Create multi-page structure
3. 🔄 Setup backend server
4. 🔄 Implement authentication
5. 🔄 Build dashboard
6. 🔄 Create editor
7. 🔄 Add payments
8. 🔄 Deploy

---

**Ready to start Phase 1?** Let me know and I'll begin creating the multi-page structure!
