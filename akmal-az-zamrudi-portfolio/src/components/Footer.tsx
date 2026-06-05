import { Github, Linkedin, BookOpen, Heart } from "lucide-react";

interface FooterProps {
  theme: "dark" | "light";
}

export default function Footer({ theme }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isDark = theme === "dark";

  const socialLinks = [
    {
      icon: <Linkedin className="w-4 h-4" />,
      href: "https://www.linkedin.com/in/akmalazamrudi/",
      label: "LinkedIn Profile",
    },
    {
      icon: <Github className="w-4 h-4" />,
      href: "https://github.com/Azamrudi",
      label: "GitHub Profile",
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      href: "https://www.researchgate.net/profile/M-Akmaluddin-Az-Zamrudi",
      label: "ResearchGate Profile",
    },
  ];

  return (
    <footer className={`border-t transition-colors duration-500 py-12 sm:py-16 ${
      isDark ? "border-white/[0.05] bg-[#0A0C10]" : "border-slate-200 bg-[#F8FAFC]"
    }`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm ${
        isDark ? "text-slate-500" : "text-slate-600"
      }`}>
        
        {/* Systems licensing copyright block */}
        <div className="flex items-center gap-2 text-center md:text-left" id="footer-copyright">
          <span>
            &copy; {currentYear} Muhammad Akmaluddin Az Zamrudi. All rights reserved.
          </span>
        </div>

        {/* Made with love label */}
        <div className={`flex items-center gap-1.5 text-xs ${
          isDark ? "text-slate-600" : "text-slate-550 text-slate-500"
        }`}>
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          <span>using React & Tailwind</span>
        </div>

        {/* Dynamic footer references path */}
        <div className="flex gap-2.5" id="footer-social-links">
          {socialLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? "border-white/[0.06] bg-white/[0.01] hover:bg-indigo-600/[0.08] text-slate-400 hover:text-white hover:border-indigo-500/35"
                  : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 hover:border-indigo-400 shadow-sm"
              }`}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
