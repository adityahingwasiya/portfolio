export const site = {
  name: "Aditya Hingwasiya",
  role: "Computer Science Engineering Student",
  tagline:
    "I enjoy analytical problem solving — turning messy constraints into clear, efficient solutions.",
  email: "adityahingwashiya@gmail.com",
  resumePath: "/resume.pdf",
  photo: "/profile.png",

  social: {
    github: "https://github.com/adityahingwasiya",
    linkedin: "https://www.linkedin.com/in/aditya-hingwashiya-733b4729b/",
    leetcode: "https://leetcode.com/u/Aditya_Hingwasiya_/",
    codechef: "https://www.codechef.com/users/adityahingwash",
    gfg: "https://www.geeksforgeeks.org/profile/adityahinkj9p",
  },

  about: {
    heading: "About me",
    paragraphs: [
      "I am a B.Tech Computer Science and Engineering student at IIIT Vadodara (CPI 8.29), with a strong foundation in Data Structures and Algorithms in Java.",
      "I recently interned at FadFocus as a Flutter Developer, working across Flutter, Next.js, and PHP on an Offer Management System. I like problems that reward careful thinking — 850+ questions on LeetCode (Knight, peak 1860) and a 3-star CodeChef profile.",
    ],
  },

  metrics: [
    { value: 850, suffix: "+", label: "LeetCode problems" },
    { value: 1860, suffix: "", label: "Peak contest rating" },
    { value: 160, suffix: "+", label: "GFG problems" },
  ],

  projects: [
    {
      title: "HomeSphere",
      group: "Full-stack",
      description:
        "A real estate listing platform with property listings, authentication, and search filters. I built UI in Flutter and connected it to a Spring Boot API, with Postman-tested REST flows and MySQL persistence.",
      tags: ["Flutter", "Dart", "Spring Boot", "REST API", "MySQL"],
      github: "https://github.com/adityahingwasiya/HomeSphere_Backend",
    },
    {
      title: "CORPconnect",
      group: "Full-stack",
      description:
        "A location-aware employee assistance platform for discovering colleagues across cities, updating locations, and requesting help. Full-stack Flutter and Spring Boot with JWT roles, city search, JPA relationships, and MySQL.",
      tags: ["Flutter", "Spring Boot", "MySQL", "JWT"],
      github: "https://github.com/adityahingwasiya/CORPconnect",
    },
  ],

  experience: [
    {
      role: "Flutter Developer Intern",
      company: "FadFocus",
      website: "https://fadfocus.in/",
      location: "Remote",
      dates: "September 2025 – November 2025",
      points: [
        "Contributed to an Offer Management System spanning Next.js, PHP, and Flutter.",
        "Optimized workflows and REST APIs, reducing screen load times by 20%.",
      ],
    },
  ],

  education: {
    school: "Indian Institute of Information Technology Vadodara",
    degree: "B.Tech in Computer Science and Engineering",
    dates: "August 2023 – May 2027",
    detail: "CPI 8.29",
    location: "Gandhinagar, Gujarat",
  },

  achievements: [
    {
      platform: "LeetCode",
      title: "Knight",
      href: "https://leetcode.com/u/Aditya_Hingwasiya_/",
      stats: [
        "Peak rating 1860",
        "Global Rank 1721 · Weekly Contest 509",
        "850+ problems solved",
      ],
      palette: "leetcode",
    },
    {
      platform: "CodeChef",
      title: "3-Star",
      href: "https://www.codechef.com/users/adityahingwash",
      stats: [
        "3-Star badge",
        "Global Rank 365 · Starters 178",
        "Division 3",
      ],
      palette: "codechef",
    },
  ],

  skills: [
    { name: "Java", group: "Languages" },
    { name: "Python", group: "Languages" },
    { name: "Dart", group: "Languages" },
    { name: "SQL", group: "Languages" },
    { name: "Flutter", group: "Frameworks" },
    { name: "Spring Boot", group: "Frameworks" },
    { name: "DSA", group: "Fundamentals" },
    { name: "OOP", group: "Fundamentals" },
    { name: "DBMS", group: "Fundamentals" },
    { name: "Git", group: "Tools" },
    { name: "Postman", group: "Tools" },
  ],
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
