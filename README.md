# Unity Space - Aerospace Engineering & Student Rocketry Platform

> **"Turning Curiosity Into Aerospace."**  
> An interactive aerospace web platform for **Unity Space**, a student-led rocketry, flight systems, and space research team at **SVPM College of Engineering Malegaon(bk), Baramati**.

---

## 🚀 Live Deployment

🌐 **Live Website**: [https://unity-space-website.vercel.app/](https://unity-space-website.vercel.app/)

---

## 🛰️ Architecture & Section Overview

The platform combines real-time 3D WebGL graphics, spatial physics animations, and aerospace telemetry:

```
01 / HERO            Turning Curiosity into Aerospace (OSS Hero Stagger + 3D Spacecraft)
02 / MISSION         We Don't Just Look Up. We Build Toward It. (3D Surface Elevation)
03 / PROJECTS        Flight & Engineering Archive (Scroll-Driven Stream + App Store Modal)
04 / TEAM            The People Behind the Mission (iOS App Folder Spring Expansion)
05 / INSIGHTS        Why We Look Up (Technical Journal Carousel + Reading Modal)
06 / SPONSORSHIP     Help Us Reach Space (Transmission Protocol Dispatch)
```

---

## ✨ Key Technical Highlights

### 1. 3D Interactive Spacecraft Orbital Scene
- Real-time Three.js WebGL scene with procedural icosahedron wireframe and dual-axis gyroscopic gimbal rings responding to pointer coordinates.
- Mobile GPU optimized with dynamic frame throttling, touch interaction, and `touch-action: pan-y` scroll passthrough.

### 2. Motion.dev Animation Suite Integration
- **OSS Hero Stagger (`vue-hero-stagger`)**: Orchestrated multiline typographic reveal and spring-physics entrance (`stiffness: 280, damping: 24`).
- **Scroll-Driven Hardware Stream (`vue-ticker-rtl`)**: Continuous right-to-left hardware telemetry stream driven by vertical page scroll with interactive touch dragging and navigation arrows.
- **iOS App Folder Team System (`vue-ios-app-folder`)**: Subteam divisions organized into frosted glass iOS squircle folders with spring layout modal expansion (`layoutId`).
- **Technical Journal Carousel (`react-carousel-pagination-arrows`)**: Publication slider with pagination arrows, spring dot indicators, and a click-to-open reader modal.
- **Projects App Store Expansion (`js-app-store`)**: Shared layout morphing (`layoutId`) expanding project thumbnail cards into full engineering telemetry modals.

### 3. 3D Surface Elevation Scroll Engine (`SurfaceReveal`)
- Custom spatial perspective component elevating content from a 3D horizontal horizon plane (`rotateX: 16deg -> 0deg` with `perspective: 1200px`) as the user scrolls into each section.

### 4. Atmospheric Space Depth & Haptic Engine
- **Micro-Dot Parallax Starfield**: Canvas-driven starfield with delicate pinprick stars and gentle parallax depth.
- **Aerospace Telemetry Cursor**: Aerodynamic dart cursor with real-time screen coordinates and rocket thruster ignition effects on hover.
- **Modal Scroll Isolation**: Lenis inertial scroll engine automatically pauses on modal open with `data-lenis-prevent="true"`, preventing background page bleed.

---

## 🛠️ Tech Stack

- **Core**: React 19, JavaScript (ESNext), HTML5
- **Build Tool**: Vite 8
- **3D Graphics & Canvas**: Three.js (WebGL), HTML5 Canvas
- **Motion & Physics**: Framer Motion, Lenis Smooth Scroll
- **Styling**: Vanilla CSS Design Tokens (Glassmorphism, CSS Variables)
- **Icons**: Lucide React
- **Hosting & CI/CD**: Vercel

---

## 📦 Getting Started

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm** or **pnpm** / **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mohitingale13/Unity_Space_Website.git
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

## 📂 Project Structure

```
Unity_Space_Website/
├── public/                  # Static assets & favicon
├── src/
│   ├── components/
│   │   ├── atmosphere/      # Starfield, Nebula Glow, Custom Cursor, SurfaceReveal
│   │   ├── navigation/      # Frosted Glass Navbar & Mobile Drawer
│   │   ├── hero/            # Hero & 3D Spacecraft Orbital Scene
│   │   ├── mission/         # Mission Statement & Focus Disciplines
│   │   ├── projects/        # Projects Showcase & Scroll-Driven Stream
│   │   ├── team/            # Team Showcase & iOS App Folders
│   │   ├── insights/        # Technical Insights Carousel & Reader Modal
│   │   ├── sponsorship/     # Sponsorship Tiers & Transmission Form
│   │   └── footer/          # Universal Footer & Credentials
│   │
│   ├── data/                # Structured data (projects, team, articles)
│   ├── styles/              # CSS design system (tokens, typography, animations)
│   ├── App.jsx              # Main application wrapper with Lenis
│   └── main.jsx             # Entry point
│
├── package.json
└── vite.config.js
```

---

## 🏛️ Institution & Credits

- **Organization**: Unity Space
- **Host Institution**: SVPM College of Engineering Malegaon(bk), Baramati
- **Contact**: `unityspace70@gmail.com`
- **Live Deployment**: [https://unity-space-website.vercel.app/](https://unity-space-website.vercel.app/)

---

*Turning Curiosity Into Aerospace.* 🚀
