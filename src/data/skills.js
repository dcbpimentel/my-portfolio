// ─────────────────────────────────────────────
// ABOUT SECTION CONTENT
// ─────────────────────────────────────────────

export const aboutContent = {
  name: "Dwyane Clark Pimentel",

  paragraph: `I'm the kind of person who redesigns the UI in his head while using someone else's app. Fourth year IT student at AdDU, specializing in UI/UX, but I also vibe code, so nothing gets lost between Figma and the browser.`,

  whatIDo: [
    "Turn design ideas into real working interfaces.",
    "Build responsive frontends in React and Tailwind CSS with clean, maintainable code",
    "Shoot and edit short-form and social media content using Final Cut Pro",
    "Produce montage, business, and promotional videos for school and personal projects",
  ],

  funLine: "When I'm not pushing pixels or cutting clips, I'm probably overthinking a font choice, or looking up beaches near Samal.",
}


// ─────────────────────────────────────────────
// SKILLS DATA ARRAY
// Usage: import { skills } from '../data/skills'
// Icons: react-icons
//   import { SiFigma } from 'react-icons/si'
//   import { FaReact } from 'react-icons/fa'
//   import { VscVscode } from 'react-icons/vsc'
// ─────────────────────────────────────────────

export const skills = [
  // ── Design ──────────────────────────────────
  {
    name: "Figma",
    category: "design",
    iconName: "SiFigma",         // react-icons/si
  },
  {
    name: "Adobe XD",
    category: "design",
    iconName: "SiAdobexd",       // react-icons/si
  },
  {
    name: "Framer",
    category: "design",
    iconName: "SiFramer",        // react-icons/si
  },

  // ── Frontend ────────────────────────────────
  {
    name: "React",
    category: "frontend",
    iconName: "FaReact",         // react-icons/fa
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    iconName: "SiTailwindcss",   // react-icons/si
  },
  {
    name: "JavaScript",
    category: "frontend",
    iconName: "SiJavascript",    // react-icons/si
  },
  {
    name: "TypeScript",
    category: "frontend",
    iconName: "SiTypescript",    // react-icons/si
  },
  {
    name: "HTML & CSS",
    category: "frontend",
    iconName: "SiHtml5",         // react-icons/si
  },

  // ── Tools ───────────────────────────────────
  {
    name: "Git",
    category: "tools",
    iconName: "FaGitAlt",        // react-icons/fa
  },
  {
    name: "VS Code",
    category: "tools",
    iconName: "VscVscode",       // react-icons/vsc
  },
  {
    name: "Claude Code",
    category: "tools",
    iconName: "SiAnthropic",     // react-icons/si
  },
  {
    name: "Vercel",
    category: "tools",
    iconName: "SiVercel",        // react-icons/si
  },
  {
    name: "npm",
    category: "tools",
    iconName: "SiNpm",           // react-icons/si
  },

  // ── Creative ────────────────────────────────
  {
    name: "Final Cut Pro",
    category: "creative",
    iconName: "FiVideo",         // react-icons/fi
  },
  {
    name: "Short-form Video",
    category: "creative",
    iconName: "FiFilm",          // react-icons/fi
  },
  {
    name: "Social Media Content",
    category: "creative",
    iconName: "FiInstagram",     // react-icons/fi
  },
  {
    name: "Video Editing",
    category: "creative",
    iconName: "FiScissors",      // react-icons/fi
  },
]


// ─────────────────────────────────────────────
// CATEGORY LABELS
// ─────────────────────────────────────────────

export const skillCategories = [
  { key: "design",   label: "Design"   },
  { key: "frontend", label: "Frontend" },
  { key: "tools",    label: "Tools"    },
  { key: "creative", label: "Creative" },
]


export default skills
