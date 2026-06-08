# SkillShare — Skill Marketplace Frontend

SkillShare ek freelance skill marketplace hai jahan **Skill Seekers** talented professionals ko dhundh kar unki services book kar sakte hain, aur **Skill Providers** apni skills list karke clients pa sakte hain.

---

## Features

**Public Pages**
- Home page with featured providers aur categories
- Explore page — search, filter by category, rating se providers dhundho
- Provider details page — skills, plans, portfolio, reviews dekho
- Blogs page
- Login / Signup

**Skill Seeker Dashboard**
- Apni bookings track karo (Pending, Accepted, Completed, Cancelled)
- Reviews likho completed bookings pe
- Profile manage karo

**Skill Provider Dashboard**
- Dashboard — earnings, stats, recent bookings
- Skills add/edit/delete karo
- Plans (Basic, Standard, Premium) manage karo
- Incoming bookings accept/complete/cancel karo
- Profile aur portfolio update karo

---

## Tech Stack

| Technology | Use |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| React Router v6 | Routing |
| Axios | API calls |
| Lucide React | Icons |
| Context API | Auth state management |

---

## Project Structure

```
src/
├── components/
│   ├── common/        # Shared components (Navbar, Footer, Cards)
│   ├── provider/      # Provider specific components
│   └── seeker/        # Seeker specific components
├── context/
│   └── AuthContext.jsx  # Global auth state
├── layouts/           # Page layouts
├── pages/
│   ├── public/        # Home, Explore, Login, Signup, Blogs
│   ├── seeker/        # Seeker dashboard pages
│   └── provider/      # Provider dashboard pages
├── routes/
│   └── ProtectedRoute.jsx
├── services/
│   └── api.js         # All API service functions
└── utils/
    └── helpers.js
```

---

## Setup & Run

**1. Dependencies install karo**
```bash
cd skillshare
npm install
```

**2. Environment configure karo**
```bash
cp .env.example .env
```

`.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

**3. Backend bhi chal raha hona chahiye**
```bash
# Alag terminal mein
cd skillshare-backend
npm run dev
```

**4. Frontend start karo**
```bash
npm run dev
```

App open hogi: `http://localhost:5173`

---

## Pages & Routes

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/explore` | Explore Providers | Public |
| `/explore?q=react` | Search Results | Public |
| `/provider/:id` | Provider Details | Public |
| `/blogs` | Blogs | Public |
| `/login` | Login | Public |
| `/signup` | Signup | Public |
| `/seeker/bookings` | My Bookings | Seeker only |
| `/seeker/profile` | My Profile | Seeker only |
| `/seeker/reviews` | My Reviews | Seeker only |
| `/provider/dashboard` | Provider Dashboard | Provider only |
| `/provider/skills` | Manage Skills | Provider only |
| `/provider/plans` | Manage Plans | Provider only |
| `/provider/bookings` | Provider Bookings | Provider only |
| `/provider/profile` | Provider Profile | Provider only |

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Skill Seeker | seeker@demo.com | demo123 |
| Skill Provider | provider@demo.com | demo123 |

> Pehle backend mein `npm run seed` run karo demo data ke liye.

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

---

## Related Projects

- [skillshare-backend](../skillshare-backend) — Node.js + Express REST API
- [skillshare-admin](../skillshare-admin) — Admin dashboard panel
