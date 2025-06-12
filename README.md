# Business Nexus

**Business Nexus** is a networking platform built to connect **entrepreneurs** and **investors**. This project is part of the developpersHub corporation frontend development internship challenge.

> ⚠️ This README is a living document and will be updated progressively as the project evolves.

---

## 🎯 Project Goal

Build a full-featured web application where two types of users can:

- Register and log in based on their role (Investor or Entrepreneur)
- Access a role-specific dashboard
- Browse public user profiles
- Send and receive collaboration requests
- Chat in real-time (simulated or actual)

---

## Tech Stack (Initial Setup)

| Layer              | Tech                             |
| ------------------ | -------------------------------- |
| Framework          | Next.js 15 (App Router)          |
| Language           | TypeScript                       |
| Styling            | Tailwind CSS + Shadcn/UI         |
| Authentication     | Supabase Auth                    |
| Backend / Realtime | Supabase (PostgreSQL + Realtime) |
| Deployment         | Vercel or Netlify                |

---

## Features (Work in Progress)

- [ ] Project scaffold with folder structure (upcoming)
- [ ] Authentication with role selection (Investor or Entrepreneur) (upcoming)
- [ ] Protected routes using Next.js middleware (upcoming)
- [ ] Role-based dashboards and layouts (upcoming)
- [ ] Public user profile pages (upcoming)
- [ ] Real-time chat system using Supabase channels  (upcoming)
- [ ] Notifications system (upcoming)
- [ ] Collaboration request management (upcoming)
- [ ] Enhanced filtering and search (upcoming)

---

## Project Structure

```
/business-nexus
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── dashboard/
│   │   ├── investor/page.tsx
│   │   └── entrepreneur/page.tsx
│   ├── profile/
│   │   ├── investor/[id]/page.tsx
│   │   └── entrepreneur/[id]/page.tsx
│   └── chat/[userId]/page.tsx
├── components/
│   ├── ui/ (Shadcn)
│   ├── forms/
│   ├── layout/
│   └── cards/
├── lib/
│   ├── supabase.ts
│   └── auth.ts
├── types/
│   └── index.ts
├── middleware.ts
├── tailwind.config.ts
└── ...

```

---

## Local Development

```bash
# Clone and install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local

# Run dev server
pnpm run dev
```

`

---

## Roadmap Highlights

- [Week 1] Setup + Auth + Basic Layouts
- [Week 2] Dashboards + Profiles + Requests
- [Week 3] Real-time Chat + Polish + Demo Prep

---

## Contributing & Updating

As the project evolves, we’ll continue updating this README with:

- Database schema changes
- Feature explanations
- UI/UX decisions
- Deployment instructions

Stay tuned ✨
