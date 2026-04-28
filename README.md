# Acumen IT 2026

![Acumen IT Banner](https://img.shields.io/badge/Symposium-2026-black?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Development-orange?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Three.js%20%7C%20GSAP-blue?style=for-the-badge)

Acumen IT 2026 is the premier annual technical symposium of the **Department of Information Technology, Vasavi College of Engineering (Autonomous)**. 

> [!NOTE]
> This is a **frontend-focused project** developed as a design and interaction inspiration for the official Acumen IT 2026 website. It showcases premium UI/UX concepts and advanced 3D transitions.

---

## ✨ Core Features

### 🌪️ Dynamic 3D Particle Logo (`LogoScene.jsx`)
An immersive Three.js-based experience where thousands of particles whirlpool to form the "ACUMEN IT" brand. 
- **GSAP Morphing**: Particles transition from a chaotic whirlpool to high-density text on load.
- **Scroll-Synced Handoff**: As the user scrolls, the particles interpolate from the hero section directly into the Navbar header, creating a seamless visual bridge.
- **Resolution Sampling**: High-density pixel sampling for crisp, bold typography in 3D space.

### ⚓ Premium Navigation (`Navbar.jsx`)
A sophisticated navigation system designed for both utility and aesthetics.
- **Hero-to-Header Transition**: The navbar badge remains invisible until the LogoScene particles "dock" into it.
- **Glassmorphic UI**: Frosted-glass components with smooth backdrop filters.
- **Expandable Floating Menu**: A minimalist bottom-floating pill that expands into a full-featured navigation suite.

### ⏳ Event Orchestration
- **Countdown Timer**: Real-time ticker for the symposium date (April 16, 2026).
- **Events Registry**: Interactive cards and categories for technical and non-technical competitions.
- **Responsive Design**: Fully optimized for mobile and desktop with a fluid "Plus Jakarta Sans" typography system.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **3D Engine** | [Three.js](https://threejs.org/) |
| **Animation** | [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/) |
| **Routing** | [React Router 7](https://reactrouter.com/) |
| **Styling** | Vanilla CSS (Modern Flexbox/Grid) |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Rakesh-Manthri/Acumen.git
cd Acumen
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI & 3D Components
│   ├── LogoScene.jsx    # Core 3D Particle Animation
│   ├── Navbar.jsx       # Scroll-synced Navigation
│   ├── GlobalParticles.jsx # Background Ambience
│   └── Lanyard.jsx      # Interactive 3D Physics Component
├── pages/               # Application Views
│   ├── Home.jsx         # Landing Page
│   ├── Events.jsx       # Competitions Listing
│   └── Register.jsx     # Registration Flow
├── data/                # Static Content & Configuration
└── index.css            # Global Design System Tokens
```

---

## 🏛️ Organized By
**Department of Information Technology**  
Vasavi College of Engineering (Autonomous)  
Hyderabad, Telangana.

© 2026 Acumen IT. All Rights Reserved.
