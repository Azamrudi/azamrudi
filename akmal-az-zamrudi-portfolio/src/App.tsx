import { useState, useEffect } from "react";
import { Language, Project, Publication, JourneyMilestone } from "./types";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Research from "./components/Research";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Firebase integrations
import { 
  auth, 
  signInWithGoogle, 
  logout, 
  fetchProjectsFromFirestore, 
  fetchPublicationsFromFirestore, 
  fetchMilestonesFromFirestore,
  saveProjectToFirestore,
  savePublicationToFirestore,
  saveMilestoneToFirestore,
  deleteProjectFromFirestore,
  deletePublicationFromFirestore,
  deleteMilestoneFromFirestore
} from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { PROJECTS_DATA, PUBLICATIONS_DATA, MILESTONES_DATA } from "./data";
import AdminConsole, { triggerAdminForm } from "./components/AdminConsole";
import { Sparkles, Database, Loader2, LogOut, AlertTriangle, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CustomNotification {
  message: string;
  type: "error" | "warning" | "success" | "info";
}

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return (saved as "dark" | "light") || "dark";
  });

  // State engines for CMS content
  const [projects, setProjects] = useState<Project[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [milestones, setMilestones] = useState<JourneyMilestone[]>([]);
  
  // Admin authentication states
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDbEmpty, setIsDbEmpty] = useState(false);
  const [isDataSyncing, setIsDataSyncing] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);

  // Custom notification toast state
  const [notification, setNotification] = useState<CustomNotification | null>(null);

  // Trigger helper for toast notifications
  const triggerNotification = (message: string, type: CustomNotification["type"] = "info") => {
    setNotification({ message, type });
  };

  // Auto-dismiss after 6 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Auth state controller
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // Verify email matches the targeted portfolio owner precisely
      if (firebaseUser && firebaseUser.email === "azamrudi@gmail.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        // Toast warning if a non-administrator logs in
        if (firebaseUser) {
          triggerNotification(
            language === "en"
              ? `Logged in as ${firebaseUser.email}. To make changes, please authenticate with the owner's address: azamrudi@gmail.com`
              : `Masuk sebagai ${firebaseUser.email}. Untuk memodifikasi data, silakan masuk dengan email terverifikasi: azamrudi@gmail.com`,
            "warning"
          );
        }
      }
    });
    return () => unsubscribe();
  }, [language]);

  // Fetch dynamic CMS data
  const loadPortfolioData = async () => {
    setIsDataSyncing(true);
    try {
      const dbProj = await fetchProjectsFromFirestore();
      const dbPub = await fetchPublicationsFromFirestore();
      const dbMilestones = await fetchMilestonesFromFirestore();

      // Determine if DB is unseeded
      if (dbProj.length === 0 && dbPub.length === 0 && dbMilestones.length === 0) {
        setIsDbEmpty(true);
        // Fall back to preloaded static template data
        setProjects(PROJECTS_DATA);
        setPublications(PUBLICATIONS_DATA);
        setMilestones(MILESTONES_DATA);
      } else {
        setIsDbEmpty(false);
        setProjects(dbProj as Project[]);
        setPublications(dbPub as Publication[]);
        setMilestones(dbMilestones as JourneyMilestone[]);
      }
    } catch (err) {
      console.error("Error loading portfolio data from Firestore:", err);
      // Resilient fallback on network/security issues
      setProjects(PROJECTS_DATA);
      setPublications(PUBLICATIONS_DATA);
      setMilestones(MILESTONES_DATA);
    } finally {
      setIsDataSyncing(false);
    }
  };

  useEffect(() => {
    loadPortfolioData();
  }, []);

  // Admin seeding wizard helper to populate database automatically
  const handleSeedDatabase = async () => {
    if (!isAdmin) return;
    setIsSeeding(true);
    try {
      // Parallelize static seeding to Firestore securely
      await Promise.all([
        ...PROJECTS_DATA.map(proj => saveProjectToFirestore(proj)),
        ...PUBLICATIONS_DATA.map(pub => savePublicationToFirestore(pub)),
        ...MILESTONES_DATA.map(m => saveMilestoneToFirestore(m))
      ]);
      await loadPortfolioData();
    } catch (err) {
      console.error("Failed database seeding:", err);
    } finally {
      setIsSeeding(false);
    }
  };

  // Auth triggers
  const handleLogin = async () => {
    try {
      const resUser = await signInWithGoogle();
      if (resUser.email !== "azamrudi@gmail.com") {
        triggerNotification(
          language === "en" 
            ? "Authentication Successful! However, only the portfolio owner (azamrudi@gmail.com) is authorized to enter co-working write/edit mode." 
            : "Autentikasi Berhasil! Namun, hanya pemilik portofolio (azamrudi@gmail.com) yang diizinkan untuk masuk ke mode ubah/tulis.",
          "warning"
        );
      } else {
        triggerNotification(
          language === "en"
            ? "Access Granted: Welcome back, Administrator."
            : "Akses Diberikan: Selamat datang kembali, Administrator.",
          "success"
        );
      }
    } catch (error) {
      console.error("Google Auth popup failed:", error);
      triggerNotification(
        language === "en"
          ? "Authentication attempt was cancelled or failed."
          : "Upaya autentikasi dibatalkan atau gagal.",
        "error"
      );
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  // CRUD CMS action bindings
  const handleSaveProject = async (proj: Project) => {
    await saveProjectToFirestore(proj);
    await loadPortfolioData();
  };

  const handleSavePublication = async (pub: Publication) => {
    await savePublicationToFirestore(pub);
    await loadPortfolioData();
  };

  const handleSaveMilestone = async (m: JourneyMilestone) => {
    await saveMilestoneToFirestore(m);
    await loadPortfolioData();
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm(language === "en" ? "Delete this project?" : "Hapus proyek ini?")) {
      await deleteProjectFromFirestore(id);
      await loadPortfolioData();
    }
  };

  const handleDeletePublication = async (id: string) => {
    if (confirm(language === "en" ? "Delete this publication?" : "Hapus publikasi ini?")) {
      await deletePublicationFromFirestore(id);
      await loadPortfolioData();
    }
  };

  const handleDeleteMilestone = async (id: string) => {
    if (confirm(language === "en" ? "Delete this milestone?" : "Hapus riwayat perjalanan ini?")) {
      await deleteMilestoneFromFirestore(id);
      await loadPortfolioData();
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden selection:bg-indigo-500 selection:text-white ${
      theme === "dark" ? "bg-[#0A0C10] text-slate-100" : "bg-[#F8FAFC] text-slate-800"
    }`}>
      {/* Dynamic Floating Navigation */}
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        theme={theme} 
        toggleTheme={toggleTheme}
        isAdmin={isAdmin}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Floating loading overlay for syncing */}
      {isDataSyncing && (
        <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2 px-4 py-2 border rounded-full bg-[#0A0C10]/80 backdrop-blur border-white/10 text-xs font-semibold text-slate-350 shadow-lg select-none">
          <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
          <span>{language === "en" ? "Syncing Firestore..." : "Menyinkronkan Database..."}</span>
        </div>
      )}

      {/* Admin quick seeding overlay banner if authenticated but database is clean */}
      {isAdmin && isDbEmpty && (
        <div className="fixed bottom-5 right-5 z-40 max-w-sm p-4 border rounded-2xl bg-[#0A0C10] border-indigo-500/30 text-xs shadow-2xl flex flex-col gap-2 animate-pulse">
          <div className="flex items-center gap-2 text-indigo-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Database Setup Wizard</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Your Firestore database is currently empty. Would you like to seed the initial pre-styled static milestones, projects, and research papers automatically?
          </p>
          <button
            onClick={handleSeedDatabase}
            disabled={isSeeding}
            className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1"
          >
            {isSeeding ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Seeding Database...</span>
              </>
            ) : (
              <>
                <Database className="w-3.5 h-3.5" />
                <span>Seed Initial Portfolio Data</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Admin logged-in persistence status header indicator */}
      {isAdmin && (
        <div className="bg-indigo-650 bg-indigo-600 text-white text-xs font-bold font-sans uppercase tracking-[0.1em] py-2.5 px-4 text-center sticky top-0 z-50 flex items-center justify-center gap-2 select-none">
          <span>{language === "en" ? "ADMINISTRATOR CO-WORKING MODE IS ACTIVE" : "MODE PENULIS / ADMIN PORTFOLIO AKTIF"}</span>
          <span className="text-white/40">|</span>
          <span className="text-[10px] bg-white/10 border border-white/15 px-2 py-0.5 rounded-full">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="ml-3 hover:text-indigo-250 cursor-pointer flex items-center gap-1 hover:underline text-[10px]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      )}

      {/* Main Container Flow */}
      <main className="relative">
        {/* Interactive Hero Intro Banner */}
        <Hero language={language} theme={theme} />

        {/* Narrative Biography and core skills matrix */}
        <About language={language} theme={theme} />

        {/* Academic NLP/LLM Publication Evaluation Dashboard */}
        <Research 
          language={language} 
          theme={theme} 
          publications={publications} 
          isAdmin={isAdmin}
          onDeletePublication={handleDeletePublication}
        />

        {/* Technical Engineering Portfolio and Repositories Filter */}
        <Projects 
          language={language} 
          theme={theme} 
          projects={projects}
          isAdmin={isAdmin}
          onDeleteProject={handleDeleteProject}
        />

        {/* Vertical Milestones Journey */}
        <Journey 
          language={language} 
          theme={theme} 
          milestones={milestones}
          isAdmin={isAdmin}
          onDeleteMilestone={handleDeleteMilestone}
        />

        {/* Contact direct transmission gateways */}
        <Contact language={language} theme={theme} />
      </main>

      {/* Structured system metadata credits */}
      <Footer theme={theme} />

      {/* Core admin editor form dialog controller */}
      <AdminConsole
        language={language}
        theme={theme}
        onSaveProject={handleSaveProject}
        onSavePublication={handleSavePublication}
        onSaveMilestone={handleSaveMilestone}
        onDeleteProject={handleDeleteProject}
        onDeletePublication={handleDeletePublication}
        onDeleteMilestone={handleDeleteMilestone}
      />

      {/* Custom beautiful notification toast with spring animation */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 z-50 max-w-sm p-4.5 rounded-2xl border shadow-2xl flex gap-3.5 items-start backdrop-blur-md transition-colors duration-300"
            style={{
              borderColor:
                notification.type === "error"
                  ? "rgba(239, 68, 68, 0.4)"
                  : notification.type === "warning"
                    ? "rgba(245, 158, 11, 0.4)"
                    : notification.type === "success"
                      ? "rgba(16, 185, 129, 0.4)"
                      : "rgba(99, 102, 241, 0.4)",
              backgroundColor:
                theme === "dark"
                  ? notification.type === "error"
                    ? "rgba(220, 38, 38, 0.15)"
                    : notification.type === "warning"
                      ? "rgba(217, 119, 6, 0.15)"
                      : notification.type === "success"
                        ? "rgba(5, 150, 105, 0.15)"
                        : "rgba(79, 70, 229, 0.15)"
                  : notification.type === "error"
                    ? "rgba(254, 242, 242, 0.95)"
                    : notification.type === "warning"
                      ? "rgba(255, 251, 235, 0.95)"
                      : notification.type === "success"
                        ? "rgba(240, 253, 250, 0.95)"
                        : "rgba(245, 243, 255, 0.95)",
              color:
                notification.type === "error"
                  ? "#EF4444"
                  : notification.type === "warning"
                    ? "#F59E0B"
                    : notification.type === "success"
                      ? "#10B981"
                      : "#6366F1",
            }}
          >
            <div className="shrink-0 mt-0.5">
              {notification.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              ) : (
                <AlertTriangle className={notification.type === "error" ? "w-5 h-5 text-red-500" : "w-5 h-5 text-amber-500"} />
              )}
            </div>
            <div className="space-y-1 pr-4">
              <span className={`text-[10px] uppercase tracking-wider font-extrabold block ${
                theme === "dark" ? "text-white/60" : "text-slate-500"
              }`}>
                {notification.type === "error" 
                  ? (language === "en" ? "System Error" : "Kesalahan Sistem")
                  : notification.type === "warning"
                    ? (language === "en" ? "Authorization Required" : "Otorisasi Diperlukan")
                    : notification.type === "success"
                      ? (language === "en" ? "Action Completed" : "Tindakan Selesai")
                      : (language === "en" ? "Information Notification" : "Pemberitahuan Informasi")
                }
              </span>
              <p className={`text-xs leading-relaxed font-sans font-medium ${
                theme === "dark" ? "text-slate-300" : "text-slate-700"
              }`}>
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="absolute top-3.5 right-3.5 opacity-65 hover:opacity-100 transition duration-150 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
