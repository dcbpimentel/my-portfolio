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
    id: 8,
    title: "Smart Menu Pricing",
    description:
      "A full-stack web application that helps small restaurant owners in Kidapawan City, Philippines calculate the exact ingredient cost of every dish and get recommended selling prices based on target food-cost percentages. Owners can manage ingredients, build recipes with quantities, and import live market prices from DTI and DA government bulletins via an automated extraction pipeline that supports HTML scraping, PDF parsing, and OCR with fuzzy ingredient matching.",
    tags: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS"],
    category: "fullstack",
    image: null,
    githubUrl: "https://github.com/dcbpimentel/smart-menu-pricing",
    liveUrl: "https://smart-menu-pricing.vercel.app",
    featured: true,
  },
  {
    id: 7,
    title: "Rally by Dwyane",
    description:
      "A mobile-first web app for organizing pickleball open play sessions at the court. Lets a host add players to a roster, randomize balanced teams across multiple courts, track live scores, and maintain a season leaderboard. Built as an installable PWA with full offline support — all data lives in the browser with no backend or account required.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Zustand", "PWA"],
    category: "frontend",
    image: null,
    githubUrl: "https://github.com/dcbpimentel/rally",
    liveUrl: "https://rally-by-dcbp.vercel.app",
    featured: true,
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
    liveUrl: "https://presnt-wine.vercel.app/",
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
