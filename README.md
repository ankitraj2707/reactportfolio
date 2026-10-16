# ⚡ Ankit Raj — 3D Creative Developer Portfolio

An award-winning, interactive 3D developer portfolio engineered with **React 18**, **Three.js**, **React Three Fiber**, **Framer Motion**, and **Tailwind CSS**.

Featuring a deep dark canvas, electric cyan and violet lighting, responsive 3D geometry, real-time GitHub activity feeds, and a verified contribution calendar.

---

## 🌐 Live Deployments & Links

- **Production Portfolio:** [ankitraj2707.vercel.app](https://ankitraj2707.vercel.app/)
- **Featured Platform (Yojana Basket):** [yojanabasket.vercel.app](https://yojanabasket.vercel.app/)
- **GitHub:** [@ankitraj2707](https://github.com/ankitraj2707)
- **LinkedIn:** [in/ankitraj2707](https://linkedin.com/in/ankitraj2707)

---

## ✨ Highlights & Architecture

- **Interactive 3D Hero Mesh:** Real-time icosahedron and floating particle field driven by Three.js and `@react-three/fiber` that reacts to cursor movement, featuring hardware-accelerated shaders and WebGL detection with 2D fallbacks.
- **Cinematic Typography:** Text animations with smooth cyan-to-violet gradients, text-clipping, chromatic glitch hover triggers, and an accessible typewriter header.
- **GitHub Activity Stream:** Direct client-side GitHub REST API integration fetching live repositories, star counts, and verified commit messages without leaking secret tokens.
- **Dark GitHub Heatmap:** Activity calendar utilizing native GitHub dark-mode aesthetics (`#0d1117`) and official activity level indicators.
- **Academic & Sprint Showcases:** Highlights B.Tech CSE coursework at Arka Jain University (2028 batch, 8.68 CGPA) and hackathon achievements.
- **Accessible & Responsive:** Full support for `prefers-reduced-motion` and touch screen device optimizations.

---

## 🛠️ Tech Stack

| Category       | Technologies                                        |
| :------------- | :-------------------------------------------------- |
| **Core**       | React 18, Vite, JavaScript (ES6+)                   |
| **3D & WebGL** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **Motion**     | Framer Motion                                       |
| **Styling**    | Tailwind CSS, PostCSS, Autoprefixer, Glassmorphism  |
| **Icons**      | Lucide React                                        |
| **Deployment** | Vercel                                              |

---

## 📂 Project Structure

```text
ankit-portfolio/
├── public/
│   └── resume.pdf
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── CanvasContainer.jsx
│   │   │   ├── HeroMesh.jsx
│   │   │   └── ParticleField.jsx
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ScrollProgress.jsx
│   │   ├── sections/
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── ContributionCalendar.jsx
│   │   │   ├── GitHubActivity.jsx
│   │   │   ├── Hackathons.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Skills.jsx
│   │   └── ui/
│   │       ├── GlassCard.jsx
│   │       ├── Loader.jsx
│   │       └── SectionHeading.jsx
│   ├── hooks/
│   │   ├── useGitHubData.js
│   │   └── useWebGLSupport.js
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   └── constants.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```
