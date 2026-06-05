import { Language } from "../types";
import { GraduationCap, MapPin, Sparkles, BrainCircuit, Cpu, Terminal, Video } from "lucide-react";

interface AboutProps {
  language: Language;
  theme: "dark" | "light";
}

export default function About({ language, theme }: AboutProps) {
  const isDark = theme === "dark";

  const categories = [
    {
      title: language === "en" ? "Artificial Intelligence & Vision" : "Kecerdasan Buatan & Vision",
      id: "AI_CV_STACK",
      icon: <BrainCircuit className={`w-4 h-4 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />,
      skills: [
        "Python",
        "OpenCV Library",
        "NLP (Naïve Bayes)",
        "LLM Prompting & Evaluation",
        "Empirical Benchmarking",
        "Jupyter Notebooks",
        "NumPy & Pandas",
      ],
    },
    {
      title: language === "en" ? "Hardware & Embedded Systems" : "Sistem Tertanam & IoT",
      id: "HARDWARE_EMBEDDED",
      icon: <Cpu className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-purple-600"}`} />,
      skills: [
        "Arduino IDE",
        "C / C++ (Embedded)",
        "ESP32 Microcontrollers",
        "Infrared Array Tracking",
        "HC-SR04 Ultrasonic Navigation",
        "L293D Driver Interfaces",
        "Weight Classification Sensors",
      ],
    },
    {
      title: language === "en" ? "Engineering Stacks & Utilities" : "Sistem & Rekayasa Utilitas",
      id: "SOFTWARE_UTILITY",
      icon: <Terminal className={`w-4 h-4 ${isDark ? "text-pink-400" : "text-pink-600"}`} />,
      skills: [
        "Git & GitHub Workflow",
        "HTML5 / CSS3",
        "Tailwind CSS Layouts",
        "Relational Databases",
        "REST API Integrations",
        "TypeScript Configuration",
        "POSIX Terminal Simulations",
      ],
    },
    {
      title: language === "en" ? "Creative Media & Broadcast" : "Produksi Media & Penyiaran",
      id: "CREATIVE_MEDIA_EVENTS",
      icon: <Video className={`w-4 h-4 ${isDark ? "text-amber-400" : "text-amber-600"}`} />,
      skills: [
        "Event Media Volunteering",
        "OBS Studio Broadcasting",
        "Live Video Orchestration",
        "Multi-Camera Production",
        "AV Routing & Live Feeds",
        "Vibe Operations & Mixing",
        "Creative Design & Assets",
      ],
    },
  ];

  return (
    <section id="about" className={`py-24 sm:py-32 border-t transition-colors duration-500 relative ${
      isDark ? "border-white/[0.05] bg-[#0C0E12]" : "border-slate-200/80 bg-white"
    }`}>
      <div className={`absolute top-0 right-1/4 w-[350px] h-[350px] rounded-full filter blur-[100px] pointer-events-none ${
        isDark ? "bg-purple-500/5" : "bg-purple-405/5 bg-purple-500/2"
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative Biography */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/15 rounded-full text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === "en" ? "Personal Background" : "Latar Belakang Resmi"}</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                {language === "en" ? "Bridging logic with practical, physically robust applications." : "Menyatukan logika algorithms dengan fungsionalitas fisik."}
              </h2>
            </div>

            {/* Bilingual Biography text block */}
            <div className={`space-y-6 leading-relaxed text-sm sm:text-base font-normal ${
              isDark ? "text-slate-400" : "text-slate-655 text-slate-600"
            }`}>
              <p>
                {language === "en" ? (
                  "My academic path at UIN Maulana Malik Ibrahim Malang is driven by a deep curiosity about how system software interacts with physical hardware. Rather than focusing purely on digital screens, I love bringing code into physical space through autonomous microcontrollers, smart sensory devices, and custom robots."
                ) : (
                  "Eksplorasi akademis saya di UIN Malang dilatarbelakangi hassat mendalam untuk menyatukan perangkat lunak virtual dengan pergerakan mekanis perangkat keras. Berfokus tak sekadar pada visual layar, saya suka membumikan logika biner ke dunia nyata melalui pemrograman mikrokontroler, papan sensorik, dan robot otonom."
                )}
              </p>
              <p>
                {language === "en" ? (
                  "What fuels my development workflow is a scientific commitment to rigorous testing and benchmarking. Whether developing responsive pathfinding arrays for physical Automated Guided Vehicles (AGVs) or tuning HSV color segmentations for efficient agricultural computer vision diagnostics, I prioritize empirical results over random estimations."
                ) : (
                  "Alur kerja rekayasa saya ditopang oleh kecintaan terhadap pengujian empiris. Baik ketika merancang navigasi adaptif untuk robot pandu otomatis (AGV) ataupun melakukan kalibrasi spektrum warna HSV sebagai alternatif deteksi citra yang efisien, saya percaya bahwa presisi sejati didapatkan dari analisis data empiris."
                )}
              </p>
              <p>
                {language === "en" ? (
                  "Alongside my technical engineering commitments, I am highly active in event management and community volunteering as a Media Operator. I love coordinating live video feeds, managing real-time broadcast orchestrations through OBS Studio, and directing physical AV setups for major campus events and seminars—ensuring high technical reliability under dynamic, high-pressure environments."
                ) : (
                  "Di samping komitmen rekayasa teknis, saya juga sangat aktif dalam manajemen kegiatan dan kepanitiaan komunitas sebagai Operator Media (Media Operator). Saya gemar mengoordinasikan umpan video langsung, mengelola orkestrasi siaran real-time menggunakan OBS Studio, serta mengawal instalasi AV fisik untuk kegiatan seminar besar kampus—menjamin keandalan teknis di bawah lingkungan dinamis yang bertekanan tinggi."
                )}
              </p>
            </div>

            {/* University and Lab locations markers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div className={`p-6 rounded-2xl flex gap-4 items-center shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-0.5 ${
                isDark
                  ? "border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03]/50 hover:border-white/10 hover:shadow-indigo-500/[0.02]"
                  : "border border-slate-200 bg-[#F8FAFC]/55 hover:bg-[#F8FAFC] hover:border-slate-300 shadow-slate-100/50"
              }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${
                  isDark ? "bg-indigo-500/10 border-indigo-500/20" : "bg-indigo-50 border-indigo-100"
                }`}>
                  <GraduationCap className="w-6 h-6 text-indigo-500" />
                </div>
                <div>
                  <span className={`block font-sans text-sm font-bold tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>UIN Maulana Malik Ibrahim</span>
                  <span className={`block text-xs font-medium mt-0.5 ${isDark ? "text-slate-500" : "text-slate-500"}`}>{language === "en" ? "Informatics (Class of 2023)" : "T. Informatika (Akt. 2023)"}</span>
                </div>
              </div>
              
              <div className={`p-6 rounded-2xl flex gap-4 items-center shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-0.5 ${
                isDark
                  ? "border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03]/50 hover:border-white/10 hover:shadow-indigo-505/[0.02]"
                  : "border border-slate-200 bg-[#F8FAFC]/55 hover:bg-[#F8FAFC] hover:border-slate-300 shadow-slate-100/50"
              }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${
                  isDark ? "bg-purple-500/10 border-purple-500/20" : "bg-purple-50 border-purple-100"
                }`}>
                  <MapPin className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <span className={`block font-sans text-sm font-bold tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>{language === "en" ? "Malang, Indonesia" : "Kota Malang, Jawa Timur"}</span>
                  <span className={`block text-xs font-medium mt-0.5 ${isDark ? "text-slate-500" : "text-slate-500"}`}>{language === "en" ? "Main Research Sandbox Base" : "Basis Utama Laboratorium Riset"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Technology Classification Matrix */}
          <div className="lg:col-span-5 space-y-10 mt-12 lg:mt-0">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/15 rounded-full text-xs font-semibold text-purple-400 uppercase tracking-wider">
                <span>{language === "en" ? "Tech Index" : "Matriks Alat"}</span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                {language === "en" ? "Core Capabilities" : "Kumpulan Kompetensi"}
              </h2>
            </div>

            {/* Classified Skills Matrices */}
            <div className="space-y-5">
              {categories.map((cat, i) => (
                <div key={i} className={`p-6 rounded-2xl shadow-sm transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-0.5 ${
                  isDark
                    ? "border border-white/[0.06] bg-white/[0.01] hover:border-white/15 hover:bg-white/[0.02]/80 hover:shadow-indigo-500/[0.02]"
                    : "border border-slate-205 border-slate-200 bg-white hover:border-slate-350 hover:bg-[#F8FAFC]/40 shadow-slate-100/50 shadow-md"
                }`}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg border ${
                      isDark ? "bg-white/[0.04] border-white/[0.05]" : "bg-slate-50 border-slate-200/80"
                    }`}>
                      {cat.icon}
                    </div>
                    <span className={`text-xs font-bold tracking-wide uppercase ${
                      isDark ? "text-white" : "text-slate-800"
                    }`}>
                      {cat.title}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cat.skills.map((skill, j) => (
                      <span 
                        key={j} 
                        className={`font-sans text-xs px-3 py-1.5 rounded-xl transition-all font-medium cursor-default border ${
                          isDark
                            ? "bg-white/[0.02]/30 border-white/[0.06] hover:border-indigo-500/40 hover:text-white text-slate-400"
                            : "bg-slate-50/50 border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-650 hover:bg-white shadow-sm"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
