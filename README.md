# Unity Space — Aerospace Engineering & Student Rocketry Platform

> **"Turning Curiosity Into Aerospace."**  
> An interactive web platform for **Unity Space**, a student-led aerospace engineering and rocketry team at **SVPM College of Engineering Malegaon(bk), Baramati**.

---

## 🚀 Overview

The Unity Space web platform is an interactive digital experience built with modern web technologies, combining aerospace storytelling, real-time 3D visuals, and smooth interactive physics.

```
01 / IDENTITY      → Turning Curiosity into Aerospace
02 / MISSION       → We Don't Just Look Up. We Build Toward It.
03 / PROJECTS      → Flight & Engineering Archive
04 / TEAM          → The People Behind the Mission
05 / INSIGHTS      → Why We Look Up (Technical Publications)
06 / SPONSORSHIP   → Help Us Reach Space (Transmission Protocol)
```

---

## 🌟 Key Highlights

### 1. Interactive 3D Orbital Gyroscope
- Real-time Three.js WebGL scene with procedural icosahedron wireframe and dual-axis gyroscopic gimbal rings responding to pointer coordinates.
- Mobile GPU optimized with dynamic frame throttling and touch interaction.

### 2. Frosted Glass Morphing Navigation
- **Translucent Frosted Navbar**: Translucent white glass navbar (`backdrop-filter: blur(28px)`) with subtle refraction borders.
- **Dynamic Floating Pill Buttons**: Morphs into floating glass pills on scroll, with smooth spring-physics active indicators.
- **Mobile-First Drawer**: Dedicated clean hamburger menu with full glass backdrop on small screens.

### 3. Alternating Scroll-Driven Hardware Gallery
- **Bi-Directional Scroll Stream**: Viewport-linked scroll interpolation driving Row 1 (left-to-right) and Row 2 (right-to-left) with Framer Motion spring physics.
- **Interactive Drag Gestures**: Full horizontal touch and pointer drag support (`drag="x"`) with momentum and spring boundaries.

### 4. Atmospheric Space Depth System
- **Micro-Dot Parallax Starfield**: Canvas-driven starfield with delicate pinprick stars and gentle parallax depth.
- **Aerospace Telemetry Cursor**: Aerodynamic dart cursor with real-time screen coordinates and rocket thruster ignition effects on hover.

---

## 🛠️ Tech Stack

- **Core**: React 19, JavaScript (ESNext), HTML5
- **Build Tool**: Vite 8
- **3D Graphics & Canvas**: Three.js (WebGL), HTML5 Canvas
- **Motion & Physics**: Framer Motion, Lenis Smooth Scroll
- **Styling**: Vanilla CSS Design Tokens (Glassmorphism, CSS Variables)
- **Icons**: Lucide React

---

## 📦 Getting Started

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SakshiRajendraShinde/Unity_Space_Website.git
   cd Unity_Space_Website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
Unity_Space_Website/
├── public/
│   ├── images/                # High-res assets & hardware imagery
│   └── favicon.svg            # Brand icon
│
├── src/
│   ├── components/
│   │   ├── atmosphere/        # Starfield, Nebula Glow, Custom Cursor
│   │   ├── navigation/        # Frosted Glass Navbar & Mobile Menu
│   │   ├── hero/              # Hero & 3D Spacecraft Orbital Scene
│   │   ├── mission/           # Mission Statement & Subteams
│   │   ├── projects/          # Projects Showcase & Bi-directional Gallery
│   │   ├── team/              # Team Showcase & Member Cards
│   │   ├── insights/          # Technical Insights & Article Modals
│   │   └── sponsorship/       # Sponsorship Tiers & Contact Form
│   │
│   ├── data/                  # Content data (projects, team, articles)
│   ├── styles/                # CSS design system (tokens, typography, animations)
│   ├── App.jsx                # Main application wrapper
│   └── main.jsx               # Entry point
│
├── package.json
└── vite.config.js
```

---

## 🏛️ Institution & Credits

- **Organization**: Unity Space
- **Host Institution**: SVPM College of Engineering Malegaon(bk), Baramati
- **Contact**: `unityspace70@gmail.com`

---

*Turning Curiosity Into Aerospace.* 🚀
