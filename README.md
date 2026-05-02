<p align="center">
  <img src="https://img.shields.io/badge/Laravel-10.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Gemini_AI-Powered-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI">
</p>

<h1 align="center">🚀 Jual.in — AI-Powered Sales Page Generator</h1>

<p align="center">
  <strong>The Future of Selling, Powered by AI.</strong><br>
  Generate high-converting, fully-designed sales pages in seconds — no coding required.
</p>

---

## 📖 Overview

**Jual.in** is a modern, AI-driven web application that empowers entrepreneurs, marketers, and business owners to create professional sales landing pages instantly. Simply describe your product, choose a design template, and let the Gemini AI craft compelling copywriting and a complete HTML sales page — ready to deploy.

### ✨ Key Features

- 🤖 **AI Copywriting** — Generates headlines, body copy, CTA, FAQs, and testimonials using Google Gemini AI
- 🎨 **Multiple Design Templates** — Choose from curated themes (Minimalist, Bold, Dark, Playful, etc.)
- 🌐 **Multilingual UI** — Full support for Indonesian (ID), English (EN), and Malay (MS)
- 🌙 **Light / Dark Mode** — System-aware theme with instant toggle
- 🔑 **Google OAuth Integration** — Seamless login and registration using Google accounts
- 👤 **Profile Management** — Personalize your account with custom profile pictures (manual upload or auto-fetch from Google)
- 🔐 **Advanced Security** — Update password, manage account settings, and 2FA-ready UI
- 📥 **One-Click HTML Export** — Download your sales page as a standalone HTML file
- 👁️ **Live Preview** — Browser-mockup preview before saving or downloading
- 📁 **Project Management** — Save, edit, regenerate, and manage all your sales pages
- 📧 **Email Verification** — Secure account validation system

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Description |
|---|---|---|
| **PHP** | ^8.1 | Server-side language |
| **Laravel** | ^10.10 | MVC framework — routing, auth, Eloquent ORM |
| **Laravel Breeze** | ^1.29 | Authentication scaffolding (login, register, verify, reset) |
| **Laravel Sanctum** | ^3.2 | API token & session authentication |
| **Inertia.js (Server)** | ^2.0 | Adapter connecting Laravel to React without a separate API |
| **Laravel Socialite** | ^5.16 | OAuth authentication for Google Login |
| **Tighten Ziggy** | ^2.0 | Exposes Laravel named routes to the frontend |
| **Guzzle HTTP** | ^7.2 | HTTP client used to call the Gemini AI API |

### Frontend
| Technology | Version | Description |
|---|---|---|
| **React** | ^19 | UI component library |
| **Inertia.js (Client)** | ^2.0 | SPA-style navigation without a full API layer |
| **Tailwind CSS** | ^4.x | Utility-first CSS framework |
| **Vite** | ^5.0 | Lightning-fast frontend build tool & dev server |
| **Zustand** | ^5.0 | Lightweight global state management (theme, language) |
| **Lucide React** | ^1.11 | Icon library |
| **Axios** | ^1.6 | HTTP client for frontend API calls |

### AI & External Services
| Service | Usage |
|---|---|
| **Google Gemini AI** | Generates all copywriting content and HTML sales page output |
| **Gmail SMTP** | Transactional email (verification, password reset) |

### Database
| Technology | Description |
|---|---|
| **MySQL** | Primary relational database |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- PHP >= 8.1 with extensions: `pdo`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`
- Composer
- Node.js >= 18.x & npm
- MySQL
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/jualin.git
cd jualin
```

**2. Install PHP dependencies**
```bash
composer install
```

**3. Install JavaScript dependencies**
```bash
npm install
```

**4. Configure environment**
```bash
cp .env.example .env
php artisan key:generate
```
Open `.env` and fill in your database credentials, mail settings, and Gemini API key.

**5. Run database migrations**
```bash
php artisan migrate
```

**6. Start development servers**

Open two terminals:
```bash
# Terminal 1 — Laravel backend
php artisan serve

# Terminal 2 — Vite frontend
npm run dev
```

**7. Open in browser**
```
http://localhost:8000
```

---

## 🔑 Environment Variables

Copy `.env.example` to `.env` and configure the following key variables:

| Variable | Description |
|---|---|
| `APP_NAME` | Your application name |
| `APP_URL` | The full URL of your app (e.g., `http://localhost:8000`) |
| `DB_*` | Database connection details |
| `MAIL_*` | SMTP credentials for sending emails |
| `GEMINI_API_KEY` | Your Google Gemini API key — **required for AI generation** |
| `GOOGLE_CLIENT_ID` | Your Google Cloud Client ID for OAuth |
| `GOOGLE_CLIENT_SECRET` | Your Google Cloud Client Secret for OAuth |
| `GOOGLE_REDIRECT_URI` | `http://127.0.0.1:8000/auth/google/callback` |

> ⚠️ Never commit your real `.env` file to version control. Only commit `.env.example`.

---

## 📂 Project Structure

```
jualin/
├── app/
│   ├── Http/Controllers/     # Request handling (Auth, Sales, AI generation)
│   └── Models/               # Eloquent models (User, Sale)
├── database/
│   └── migrations/           # Database schema definitions
├── resources/
│   ├── css/app.css           # Global styles & CSS custom properties (theme tokens)
│   └── js/
│       ├── Components/       # Reusable UI components (Navbar, Sidebar, Modals)
│       ├── Layouts/          # Page layout wrappers (Dashboard, Auth)
│       ├── Pages/            # Inertia page components (Auth, Dashboard)
│       └── store/            # Zustand global store (theme, language, translations)
├── routes/
│   └── web.php               # All application routes
└── .env.example              # Environment variable template
```

---

## 🌐 Available Routes

| Route | Description |
|---|---|
| `GET /` | Landing page |
| `GET /login` | Login page |
| `GET /register` | Registration page |
| `GET /dashboard` | Main dashboard |
| `GET /dashboard/ai-generator` | AI Sales Page Generator |
| `GET /dashboard/projects` | My Projects (saved pages) |
| `GET /dashboard/settings` | Account settings |
| `GET /s/{slug}` | Public sales page preview |
| `POST /sales/generate` | Trigger AI generation (Gemini) |

---

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ using Laravel, React, Inertia.js & Google Gemini AI
</p>
