# 🌐 Ryan's Portfoolio

[**Live Demo**](https://ryanmusuka.vercel.app) 

This Portfoolio** is a display of my current profile, projects and technical blog. Built with a "Cypherpunk Meets Clean Cloud" aesthetic, it merges advanced UI/UX principles with a robust backend to showcase engineering depth and development passion.

-----

## 🛠️ Technical Stack

I selected this stack to prioritize performance (Core Web Vitals) and modern React patterns.

  * **Framework:** Next.js 16.2.3 (App Router) — Leveraging Server Components for optimal Time to First Byte (TTFB).
  * **Library:** React 19.2.4 — Utilizing the latest concurrent rendering features and improved hook performance.
  * **Styling:** Tailwind CSS 4.2.2 — Implementing a "Midnight Blue" (`#0f172a`) and "Sunset Coral" (`#ea580c`) palette.
  * **Animations:** Framer Motion 12.38.0 — Strategic use for micro-interactions to protect bundle size and maintain high FPS.
  * **Database:** Supabase (PostgreSQL) — Managed with strict Row Level Security (RLS) and real-time capabilities.
  * **Communication:** Nodemailer + Next.js API — Custom-built secure transport for user inquiries, demonstrating full-stack proficiency.

-----

## ✨ Key Features

### 🍱 The "Bento Box" Architecture

Utilizes a modular grid layout to display dense information—skills, projects, and certifications—in a highly organized, "trendy" tech aesthetic. This layout ensures scannability without overwhelming the user with walls of text.

### ✍️ Headless Blog with RLS Security

A full-stack blog integration powered by Supabase.

  * **Security First:** Enforces strict RLS policies where the public has `SELECT` only access, while administrative actions (Insert/Update/Delete) require authenticated sessions via Supabase Auth.
  * **XSS Mitigation:** All database payloads are sanitized on the server before being rendered into the DOM to prevent Cross-Site Scripting.

### 🖱️ Reactive Infrastructure Grid

The background features a repeating 1px blueprint grid. A CSS `mask-image` with a radial gradient follows the user’s mouse pointer (using throttled client-side state), "illuminating" the grid to represent data visibility and precision system design.

### 📬 The "Full-Stack Engineer" Contact Bridge

Instead of using third-party forms, I engineered a secure **Next.js API + Nodemailer** route.

  * **The Logic:** The system uses a backend API to interface with a Gmail service account to securely relay messages to my primary inbox.
  * **Security:** This approach keeps SMTP credentials and API keys strictly on the server (Environment Variables), preventing exposure to the client-side bundle and mitigating potential spam vectors.

-----

## 🏗️ Architectural Decisions & Trade-offs

### 1\. Performance vs. Aesthetic

To maintain high **Core Web Vitals**, I chose to render the bulk of the content statically. Framer Motion is strictly reserved for entry animations and hover states. This is a deliberate engineering trade-off: we sacrifice a small amount of "constant" movement for a significantly lower Total Blocking Time (TBT).

### 2\. Mobile-First "Ruggedized" UI

The mobile UI uses a stacked vertical layout with high-contrast touch targets. This "ruggedized" design ensures functionality in high-glare conditions, a principle carried over from the Zentinel traffic enforcement project.

### 3\. F-Pattern Reading Optimization

The desktop layout is architected with a two-column grid. My name and value proposition are positioned on the left to align with western reading patterns, ensuring visitors process my technical identity before they process my visual assets.

-----

## 🧠 Lessons Learned

  * **API Route Security:** Building the custom Nodemailer bridge taught me the importance of environment variable isolation and how to handle server-side transport errors gracefully without leaking system info to the frontend.
  * **Optimizing LCP:** I learned that even a small hero image can ruin a Lighthouse score if not optimized. Using the Next.js `<Image />` component with `priority` and `placeholder="blur"` was essential to achieving a high score.
  * **Grid Systems:** Implementing the "Architectural Grid" background required a deep dive into CSS `mask-image` and radial gradients to ensure smooth performance during mouse movement by debouncing the event listener.

-----

*Developed with precision by Ryan Musuka — 2026.*
