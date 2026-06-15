const projects = [
  {
    id: 1,
    title: "Davao Housing Rental",
    description:
      "A Flutter mobile app for finding verified dormitories near Ateneo de Davao University. Features Google Sign-In, a live dashboard of dorm listings with ratings and pricing, map coordinates, and a detailed dorm view with owner contact info. Built with real data sourced via Supabase.",
    tags: ["Flutter", "Dart", "Supabase", "Firebase"],
    category: "mobile",
    image: "/images/dormitory-dashboard.png",
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Boyd's Pizza House: Restaurant Operations",
    description:
      "A full-featured web-based restaurant management system for Boyd's Pizza House. Includes a live operations dashboard tracking daily sales, inventory value, and gross profit, plus modules for staff management, menu engineering, purchasing, catering, and sales reports.",
    tags: ["Web App", "Dashboard", "Operations", "Full Stack"],
    category: "fullstack",
    image: "/images/boyds-pizza-dashboard.png",
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Pomodoro+",
    description:
      "A Java Swing desktop application redesigned with a gradient glass-morphism UI. Supports configurable study duration, break duration, and number of sessions with real-time countdown, session progress tracking, and a native macOS-style notification at session end.",
    tags: ["Java", "Swing", "Desktop", "GUI"],
    category: "frontend",
    image: "/images/pomodoro.jpg",
    githubUrl: "#",
    liveUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Fullstack Portfolio",
    description:
      "My first fullstack portfolio website built with Node.js, Express, and EJS server-side templates. Features a glass-morphism dark UI, animated project cards, a terminal-style About section, and an integrated Google Drive viewer for database project files.",
    tags: ["Node.js", "Express.js", "EJS", "CSS"],
    category: "fullstack",
    image: "/images/boyds-pizza-login.png",
    githubUrl: "#",
    liveUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Presnt",
    description:
      "A QR-based attendance system for teachers and students built as a full-stack web app. Teachers start a live session that generates a scannable QR code, and students scan it from their phone to instantly mark themselves present or late. Supabase Row Level Security enforces data isolation between users entirely at the database level, with no custom backend server.",
    tags: ["React", "Supabase", "Tailwind CSS", "PostgreSQL", "Recharts"],
    category: "fullstack",
    image: null,
    githubUrl: "https://github.com/dcbpimentel/Presnt",
    liveUrl: "#",
    featured: true,
  },
  {
    id: 5,
    title: "Intro Web: Calculator Suite",
    description:
      "A set of utility web pages built from scratch in my freshman year: unit conversion, income tax calculator, factorial/sum/average solver, and a simple payroll processor. My first real HTML/CSS/JavaScript project, where it all started.",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "frontend",
    image: null,
    githubUrl: "#",
    liveUrl: "#",
    featured: false,
  },
]

export default projects
