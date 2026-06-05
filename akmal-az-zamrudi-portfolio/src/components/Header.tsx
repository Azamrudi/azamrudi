import { Language } from "../types";
import { Globe, ArrowRight, Sun, Moon, Lock, Unlock } from "lucide-react";

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export default function Header({ 
  language, 
  setLanguage, 
  theme, 
  toggleTheme,
  isAdmin,
  onLogin,
  onLogout
}: HeaderProps) {
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "id" : "en");
  };

  const menuItems = [
    { label: language === "en" ? "About" : "Tentang", href: "#about" },
    { label: language === "en" ? "Research" : "Riset", href: "#research" },
    { label: language === "en" ? "Projects" : "Proyek", href: "#projects" },
    { label: language === "en" ? "Journey" : "Perjalanan", href: "#journey" },
    { label: language === "en" ? "Contact" : "Kontak", href: "#contact" },
  ];

  const isDark = theme === "dark";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b transition-all duration-500 ${
      isDark 
        ? "bg-[#0F1115]/80 border-white/[0.06] text-white" 
        : "bg-white/80 border-slate-200/80 text-slate-900"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
        {/* Profile identity branding */}
        <a
          href="#hero"
          className="flex flex-col text-left group"
          id="branding-logo"
        >
          <span className={`text-[10px] uppercase tracking-[0.25em] font-extrabold transition-colors ${
            isDark ? "text-indigo-400/95 group-hover:text-indigo-300" : "text-indigo-600 group-hover:text-indigo-500"
          }`}>
            M. Akmaluddin
          </span>
          <h2 className={`text-lg sm:text-xl font-extrabold tracking-tight flex items-center gap-1.5 leading-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            <span>Az Zamrudi</span>
          </h2>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 font-sans text-sm font-medium">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`px-3.5 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                isDark 
                  ? "text-slate-400 hover:text-white hover:bg-white/[0.03]" 
                  : "text-slate-600 hover:text-indigo-650 hover:bg-indigo-50/50"
              }`}
              id={`nav-link-${item.href.replace("#", "")}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button, Theme Toggle & Language Switch Capsule */}
        <div className="flex items-center space-x-3">
          {/* Admin Lock / Unlock authentication button */}
          <button
            onClick={isAdmin ? onLogout : onLogin}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 hover:scale-[1.08] active:scale-95 cursor-pointer shadow-sm ${
              isAdmin
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-450 hover:bg-emerald-555"
                : isDark
                  ? "border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] text-slate-400"
                  : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-600"
            }`}
            title={isAdmin ? (language === "en" ? "Sign Out of Admin Console" : "Keluar dari Konsol Admin") : (language === "en" ? "Access Administrator Console" : "Masuk ke Konsol Admin")}
            id="btn-admin-auth"
          >
            {isAdmin ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4" />}
          </button>

          {/* Theme Toggler button */}
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 hover:scale-[1.08] active:scale-95 cursor-pointer shadow-sm ${
              isDark
                ? "border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] text-indigo-400"
                : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-amber-500"
            }`}
            title={isDark ? "Menerapkan Mode Terang" : "Menerapkan Mode Gelap"}
            id="btn-theme-toggle"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Language selector toggle */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-2 font-sans text-xs font-semibold border px-3.5 py-2 rounded-full transition-all duration-300 hover:scale-[1.04] active:scale-95 cursor-pointer shadow-sm ${
              isDark
                ? "border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] text-slate-300"
                : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700"
            }`}
            id="btn-language-toggle"
            title={language === "en" ? "Menerjemahkan ke Bahasa Indonesia" : "Switch to English"}
          >
            <Globe className="w-3.5 h-3.5 text-indigo-500" />
            <span className={`${isDark ? (language === "id" ? "text-white font-bold" : "text-slate-500") : (language === "id" ? "text-indigo-650 font-bold" : "text-slate-400")}`}>ID</span>
            <span className={isDark ? "text-slate-700" : "text-slate-300"}>|</span>
            <span className={`${isDark ? (language === "en" ? "text-white font-bold" : "text-slate-500") : (language === "en" ? "text-indigo-650 font-bold" : "text-slate-400")}`}>EN</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 font-sans text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.04] active:scale-95 font-semibold tracking-wide shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20"
            id="nav-action-hire"
          >
            <span>{language === "en" ? "Let's Connect" : "Hubungi"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
