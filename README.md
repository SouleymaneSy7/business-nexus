# Business Nexus

![Business Nexus Preview](/public/preview/preview.png)

**Business Nexus** is a networking platform built to connect **entrepreneurs** and **investors**. This project is part of the developpersHub corporation frontend development internship challenge.

> ⚠️ This README is a living document and will be updated progressively as the project evolves.

---

## Project Goals

Build a full-featured web application where two types of users can:

- Register and log in based on their role (Investor or Entrepreneur)
- Access a role-specific dashboard
- Browse public user profiles
- Send and receive collaboration requests
- Chat in real-time (simulated or actual)

---

## Tech Stack

| Layer          | Tech                                       |
| -------------- | ------------------------------------------ |
| Framework      | Next.js 15 (App Router)                    |
| Language       | TypeScript                                 |
| Styling        | Tailwind CSS, Shadcn UI, MagicUI, Radix UI |
| Forms          | React Hook Form, Zod                       |
| Linting/Format | ESLint, Prettier                           |
| Deployment     | Netlify                                    |

---

## Roadmap Highlights

- [x] [Week 1] Setup + Auth + Basic Layouts
- [x] [Week 2] Dashboards + Profiles + Requests
- [x] [Week 3] Real-time Chat + Polish + Demo Prep

---

## Feature Details and Usage Guides

- **Authentication:** Secure registration and login for Investors and Entrepreneurs, with role-based access control. Users select their role during signup and are directed to the appropriate dashboard after login.

- **Dashboards:** Each user type has a dedicated dashboard displaying relevant actions, such as  managing profiles, and accessing chat.

- **Profiles:** Publicly viewable profiles for both roles, allowing users to showcase their background, interests, and projects. Profiles can be browsed by all users.

- **Collaboration Requests:** Users can send and receive requests to connect or collaborate. Requests are managed from the dashboard, with options to accept or decline.

- **Real-time Chat:** Simulated or actual real-time messaging between users, accessible from the dashboard or profile pages.

**Usage Guides:**  
Step-by-step instructions (with screenshots planned) will be provided for common tasks such as signing up, editing profiles, sending requests, and starting chats. These guides will help both new users and contributors understand the platform’s workflows.

### UI/UX Rationale

- **Design Choices:** The interface uses Shadcn UI and MagicUI for a modern, accessible look. Tailwind CSS ensures consistent styling and responsive layouts. Color schemes and component choices prioritize readability and ease of use.

- **User Experience:** User flows are designed for clarity—entrepreneurs and investors see only relevant features. Navigation is streamlined to minimize friction and support efficient interactions.

### Deployment and Setup Instructions

- **Deployment:** To deploy on Netlify, push your code to GitHub and connect the repository to Netlify. Use `pnpm build` as the build command and `pnpm dev` for preview.

- **Setup:**  
  1. Clone the repository: `git clone https://github.com/SouleymaneSy7/business-nexus.git`
  2. Install dependencies: `pnpm install`
  3. Start the development server: `pnpm dev`
  4. For troubleshooting, check the project’s issues or open a new one for support.

---

## Project Structure

```md
/business-nexus
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── global.css
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── dashboard/
│   │   ├── investor/
│   │   │   └── page.tsx
│   │   └── entrepreneur/
│   │       └── page.tsx
│   ├── profile/
│   │   ├── investor/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── entrepreneur/
│   │       └── [id]/
│   │           └── page.tsx
│   └── chat/
│       └── [userId]/
│           └── page.tsx
├── components/
│   ├── ui/           # Shadcn UI components
│   ├── magicui/      # MagicUI components
│   ├── auth/
│   ├── chat/
│   ├── common/
│   ├── dashboard/
│   ├── profile/
│   └── shared/
├── hooks/
│   └── use-mobile.ts
├── icons/
│   └── Icon.component.tsx
├── lib/
│   ├── mock-data.ts
│   └── utils.ts
├── types/
│   └── index.ts
├── utils/
│   └── getNameInitials.ts
├── components.json
├── next.config.ts
└── ...
```

---

## Local Development

```bash
# Clone the project
git clone https://github.com/SouleymaneSy7/business-nexus.git

# install dependencies
pnpm install

# Start the development server
pnpm dev

# Build the project for production
pnpm build
```

---

## Stay Tuned

More features, improvements, and detailed guides are on the way.  
Check back regularly for updates as Business Nexus evolves!
