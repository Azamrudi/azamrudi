import { Language } from "../types";
import { motion } from "motion/react";
import { ArrowUpRight, GraduationCap, MapPin, Award, Terminal, Cpu, BrainCircuit } from "lucide-react";

interface HeroProps {
  language: Language;
  theme: "dark" | "light";
}

export default function Hero({ language, theme }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const isDark = theme === "dark";

  return (
    <section key={language} id="hero" className={`relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden transition-colors duration-500 ${
      isDark ? "bg-[#0A0C10]" : "bg-[#F8FAFC]"
    }`}>
      {/* Figma style soft ambient glow meshes in background */}
      <div className={`absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full filter blur-[100px] pointer-events-none animate-pulse duration-[8000ms] ${
        isDark ? "bg-indigo-600/10" : "bg-indigo-400/5"
      }`}></div>
      <div className={`absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full filter blur-[100px] pointer-events-none animate-pulse duration-[6000ms] ${
        isDark ? "bg-purple-600/10" : "bg-purple-400/5"
      }`}></div>
      <div className={`absolute inset-0 [background-size:24px_24px] ${
        isDark 
          ? "bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)]" 
          : "bg-[radial-gradient(rgba(15,23,42,0.03)_1px,transparent_1px)]"
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-6 sm:py-12">
        
        {/* Left Column - Core bio & value statement */}
        <motion.div 
          className="lg:col-span-7 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Availability / Status Capsule */}
          <motion.div 
            variants={itemVariants}
            className={`inline-flex items-center space-x-2.5 border px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-medium tracking-wide shadow-sm ${
              isDark 
                ? "border-indigo-500/20 bg-indigo-500/5 text-indigo-300" 
                : "border-indigo-500/10 bg-indigo-50/50 text-indigo-600"
            }`}
            id="status-badge"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${
                isDark ? "bg-indigo-400" : "bg-indigo-600"
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isDark ? "bg-indigo-400" : "bg-indigo-600"
              }`}></span>
            </span>
            <span>
              {language === "en" ? "Available for Research & Collaborations" : "Terbuka untuk Kolaborasi Riset"}
            </span>
          </motion.div>

          {/* Elegant Display Heading */}
          <motion.div variants={itemVariants} className="space-y-4">
            <span className={`block text-xs uppercase tracking-[0.25em] font-extrabold ${
              isDark ? "text-indigo-400" : "text-indigo-600"
            }`}>
              {language === "en" ? "INFORMATICS // RESEARCH & DEVELOPMENT" : "TEKNIK INFORMATIKA // RISET & DEVELOMENT"}
            </span>
            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              {language === "en" ? (
                <>
                  Designing smarter <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    physical systems.
                  </span>
                </>
              ) : (
                <>
                  Merancang sistem <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-505 via-purple-500 to-pink-500">
                    cerdas yang nyata.
                  </span>
                </>
              )}
            </h1>
          </motion.div>

          {/* Meticulous Portfolio Bio */}
          <motion.p 
            variants={itemVariants} 
            className={`text-base leading-relaxed max-w-2xl font-normal font-sans ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
            id="hero-tagline"
          >
            {language === "en" ? (
              "Hello, I am Muhammad Akmaluddin Az Zamrudi—an Informatics scholar at UIN Malang. I specialize in bridging advanced digital insights, computer vision diagnostics, and autonomous edge robotics with systematic model evaluations."
            ) : (
              "Halo, saya Muhammad Akmaluddin Az Zamrudi — mahasiswa Teknik Informatika UIN Malang. Saya berupaya menghubungkan analisis kecerdasan buatan, visual komputer (computer vision), serta robotika terdistribusi dengan standardisasi pengujian sistem."
            )}
          </motion.p>

          {/* Action Links with Premium Design Pill styling */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <a 
              href="#research" 
              className="px-6 py-3.5 bg-indigo-600 hover:bg-[#4338CA] text-white font-semibold text-sm tracking-wide rounded-full transition-all duration-300 ease-out hover:scale-[1.03] active:scale-95 shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/30 flex items-center gap-2"
              id="cta-research"
            >
              <span>{language === "en" ? "Explore Research" : "Jelajahi Riset"}</span>
              <span className="text-xs opacity-70">&darr;</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/akmalazamrudi" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`px-6 py-3.5 border font-semibold text-sm tracking-wide rounded-full transition-all duration-300 ease-out hover:scale-[1.03] active:scale-95 flex items-center gap-2 ${
                isDark 
                  ? "border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] text-slate-300 hover:text-white" 
                  : "border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm"
              }`}
              id="cta-linkedin"
            >
              <span>LinkedIn Profile</span>
              <ArrowUpRight className="w-4 h-4 text-indigo-500" />
            </a>
          </motion.div>
        </motion.div>
        
        {/* Right Column - Beautiful human-crafted Profile Spotlight Card */}
        <motion.div 
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={`border rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group transition-all duration-300 ease-out hover:scale-[1.015] hover:shadow-indigo-500/[0.03] backdrop-blur-md ${
            isDark 
              ? "bg-gradient-to-b from-white/[0.04] to-white/[0.01] border-white/[0.07] hover:border-white/15" 
              : "bg-white border-slate-200/90 shadow-xl shadow-slate-100/50"
          }`}>
            {/* Top Card Branding */}
            <div className={`flex items-center justify-between border-b pb-4 mb-6 ${
              isDark ? "border-white/[0.06]" : "border-slate-100"
            }`}>
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className={`font-semibold text-xs tracking-wide uppercase ${
                  isDark ? "text-white/80" : "text-slate-700"
                }`}>Sandbox Workspace</span>
              </div>
              <span className="text-slate-450 text-slate-500 font-mono text-[10px]">VER_3.02</span>
            </div>

            {/* Structured Academic Profile Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                  isDark ? "bg-indigo-500/10 border-indigo-500/20" : "bg-indigo-50 border-indigo-100"
                }`}>
                  <GraduationCap className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <h4 className={`font-semibold text-sm tracking-tight ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}>UIN Maulana Malik Ibrahim</h4>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {language === "en" ? "B.Sc. Informatics Student // Class of 2023" : "Mahasiswa S1 Teknik Informatika // Angkatan 2023"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                  isDark ? "bg-purple-500/10 border-purple-500/20" : "bg-purple-50 border-purple-100"
                }`}>
                  <MapPin className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h4 className={`font-semibold text-sm tracking-tight ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}>{language === "en" ? "Malang Base" : "Malang, Indonesia"}</h4>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {language === "en" ? "Active in AI Modeling & Systems Lab" : "Aktif di Laboratorium Riset & Integrasi"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                  isDark ? "bg-pink-500/10 border-pink-500/20" : "bg-pink-50 border-pink-100"
                }`}>
                  <Award className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h4 className={`font-semibold text-sm tracking-tight ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}>{language === "en" ? "Peer-Reviewed Publications" : "Publikasi Jurnal Riset"}</h4>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {language === "en" ? "National Accredited Jurnal Ilmiah (2209)" : "Jurnal Nasional Terakreditasi (SINTA)"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Pillars Overview */}
            <div className={`mt-8 pt-6 border-t grid grid-cols-3 gap-3 text-center ${
              isDark ? "border-white/[0.06]" : "border-slate-100"
            }`}>
              <div className={`p-3 rounded-xl border hover:scale-[1.05] transition-all duration-300 ease-out ${
                isDark 
                  ? "bg-white/[0.02] border-white/[0.03] hover:border-indigo-500/30 hover:bg-white/[0.04]" 
                  : "bg-slate-50 border-slate-200/50 hover:border-indigo-500/30 hover:bg-white"
              }`}>
                <BrainCircuit className="w-4 h-4 text-indigo-500 mx-auto mb-1.5" />
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">{language === "en" ? "AI & NLP" : "Kecerdasan"}</span>
                <span className={`block text-[11px] font-extrabold mt-1 ${isDark ? "text-white" : "text-slate-800"}`}>100%</span>
              </div>
              <div className={`p-3 rounded-xl border hover:scale-[1.05] transition-all duration-300 ease-out ${
                isDark 
                  ? "bg-white/[0.02] border-white/[0.03] hover:border-purple-500/30 hover:bg-white/[0.04]" 
                  : "bg-slate-50 border-slate-200/50 hover:border-purple-500/30 hover:bg-white"
              }`}>
                <Cpu className="w-4 h-4 text-purple-500 mx-auto mb-1.5" />
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">{language === "en" ? "IoT" : "Sistem Fisik"}</span>
                <span className={`block text-[11px] font-extrabold mt-1 ${isDark ? "text-white" : "text-slate-800"}`}>Arduino</span>
              </div>
              <div className={`p-3 rounded-xl border hover:scale-[1.05] transition-all duration-300 ease-out ${
                isDark 
                  ? "bg-white/[0.02] border-white/[0.03] hover:border-pink-500/30 hover:bg-white/[0.04]" 
                  : "bg-slate-50 border-slate-200/50 hover:border-pink-500/30 hover:bg-white"
              }`}>
                <Terminal className="w-4 h-4 text-pink-500 mx-auto mb-1.5" />
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">{language === "en" ? "Python" : "Instansi"}</span>
                <span className={`block text-[11px] font-extrabold mt-1 ${isDark ? "text-white" : "text-slate-800"}`}>Real OpenCV</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
