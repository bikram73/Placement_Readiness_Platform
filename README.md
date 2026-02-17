# Placement Readiness Platform

A premium SaaS-style application designed to help candidates prepare for their dream jobs through intelligent job description analysis, personalized preparation plans, and progress tracking.

## 🚀 Overview

The Placement Readiness Platform is a serious B2C product designed with a "Calm, Intentional, Coherent, Confident" philosophy. It moves away from flashy, hackathon-style designs to offer a professional environment for career preparation.

It bridges the gap between generic preparation and specific job requirements by analyzing job descriptions to generate tailored study plans.

## ✨ Key Features

### 🎯 Dashboard
- **Readiness Score:** Visual circular progress indicator.
- **Skill Breakdown:** Radar chart analyzing DSA, System Design, Communication, etc.
- **Weekly Goals:** Tracking problem-solving progress.
- **Upcoming Assessments:** Schedule of mock tests and reviews.

### 🔍 Job Description Analysis
- **Smart Skill Extraction:** Heuristic-based keyword detection from JDs (Core CS, Languages, Web, Data, Cloud, etc.).
- **Round-wise Checklist:** Tailored preparation steps for Aptitude, Technical, and HR rounds.
- **7-Day Preparation Plan:** Dynamic daily schedule based on detected skills.
- **Interview Questions:** Context-aware questions generated from the JD.
- **Company Intel:** Heuristic estimation of company size and hiring focus (Startup vs. Enterprise).

### 📊 Interactive Results
- **Self-Assessment:** Toggle skills between "I know this" and "Need practice".
- **Live Scoring:** Readiness score updates in real-time based on confidence levels.
- **Export Tools:** Copy plans, checklists, and questions to clipboard or download as text.

### 💾 History & Persistence
- **Local Storage:** All analysis data is persisted locally.
- **History View:** Review past analyses and track progress over time.

### ✅ Quality Assurance
- **Built-in Test Checklist:** A dedicated route to verify core functionality before shipping.
- **Proof of Work:** Final submission generation with project artifacts.

## 🎨 Design System

- **Philosophy:** Not flashy, not loud. No gradients or glassmorphism.
- **Typography:** Serif headings for confidence, clean Sans-serif body for readability.
- **Color Palette:**
  - Background: `#F7F6F3` (Off-white)
  - Primary Text: `#111111`
  - Accent: `#8B0000` (Deep Red)
- **Spacing:** Strict 8px scale (8, 16, 24, 40, 64px).

## 🧠 Core Logic

The platform uses a deterministic heuristic engine to analyze Job Descriptions (JDs) without relying on external AI APIs.

1.  **Skill Extraction:** Scans JDs for over 50+ keywords across categories like Core CS, Web, Data, Cloud, and Testing.
2.  **Readiness Scoring:** Calculates a score (0-100) based on:
    *   Base score (35 points)
    *   Detected skills (+5 per category)
    *   JD metadata (Company name, Role, Length)
    *   User confidence (Interactive toggles adjust score live)
3.  **Round Mapping:** Infers company type (Startup vs. Enterprise) to generate a tailored 4-round interview process.

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components
│   ├── ui/           # Design system primitives (Cards, Buttons)
│   ├── layout/       # AppShell, Sidebar, Header
│   └── features/     # Feature-specific components (RadarChart, JDInput)
├── pages/            # Route components
│   ├── Dashboard.tsx # Main user dashboard
│   ├── Analyze.tsx   # JD Analysis input
│   ├── Results.tsx   # Analysis results & planning
│   └── ...
├── lib/              # Utilities and logic
│   ├── analysis.ts   # Skill extraction & scoring algorithms
│   ├── storage.ts    # LocalStorage persistence helpers
│   └── utils.ts      # CSS class merging & formatting
├── App.tsx           # Main application entry & routing
└── main.tsx          # React DOM rendering
```

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Icons:** Lucide React
- **Charts:** Recharts
- **State/Persistence:** LocalStorage

## 🏃‍♂️ Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/bikram73/Placement_Readiness_Platform.git
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

## 📱 Application Routes

- `/`: Landing Page
- `/dashboard`: Main User Dashboard
- `/practice`: Practice Area
- `/assessments`: Mock Tests & Reviews
- `/resources`: Learning Materials
- `/profile`: User Profile
- `/analyze`: Job Description Analysis Tool
- `/history`: Past Analysis History
- `/results`: Analysis Results & Planning
- `/prp/07-test`: System Integrity Checklist
- `/prp/08-ship`: Final Submission Page

## 📄 License

This project is proprietary and intended for educational and portfolio purposes.

---

*Built with intent.*