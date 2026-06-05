import { useState } from "react";
import { Language, Project } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Github, Eye, Cpu, Database, ArrowUpRight, FolderGit2, Edit, Trash2, Plus } from "lucide-react";
import { triggerAdminForm } from "./AdminConsole";

interface ProjectsProps {
  language: Language;
  theme: "dark" | "light";
  projects: Project[];
  isAdmin: boolean;
  onDeleteProject: (id: string) => Promise<void>;
}

type ProjectFilter = "all" | "ai_cv" | "robotics_iot" | "web_cli";

export default function Projects({ 
  language, 
  theme, 
  projects, 
  isAdmin, 
  onDeleteProject 
}: ProjectsProps) {
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const isDark = theme === "dark";

  const filterTabs = [
    { label: language === "en" ? "All Systems" : "Semua Sistem", id: "all" as const },
    { label: language === "en" ? "AI & Vision" : "Kecerdasan Buatan", id: "ai_cv" as const },
    { label: language === "en" ? "Robotics & IoT" : "Robotika / IoT", id: "robotics_iot" as const },
    { label: language === "en" ? "Software & CLI" : "Perangkat Lunak", id: "web_cli" as const },
  ];

  const filteredProjects = projects.filter((proj) => {
    if (filter === "all") return true;
    return proj.category === filter;
  });

  const getCategoryIcon = (category: Project["category"]) => {
    switch (category) {
      case "ai_cv":
        return <Eye className={`w-4 h-4 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />;
      case "robotics_iot":
        return <Cpu className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-purple-600"}`} />;
      case "web_cli":
        return <Database className={`w-4 h-4 ${isDark ? "text-pink-400" : "text-pink-650 text-indigo-600"}`} />;
    }
  };

  const getCategoryLabel = (category: Project["category"]) => {
    switch (category) {
      case "ai_cv":
        return "Computer Vision / AI";
      case "robotics_iot":
        return "Robotics & IoT Systems";
      case "web_cli":
        return "Software Architecture & CLI";
    }
  };

  return (
    <section id="projects" className={`py-24 sm:py-32 border-t transition-colors duration-500 relative ${
      isDark ? "border-white/[0.05] bg-[#0C0E12]" : "border-slate-200 bg-white"
    }`}>
      <div className={`absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full filter blur-[100px] pointer-events-none ${
        isDark ? "bg-indigo-505/5 bg-indigo-500/5" : "bg-indigo-400/2 bg-indigo-500/2"
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/15 rounded-full text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>{language === "en" ? "Engineering Gallery" : "Galeri Portofolio"}</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none uppercase ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              {language === "en" ? "Functional Systems" : "Karya Rekayasa Sistem"}
            </h2>
          </div>

          {isAdmin && (
            <button
              onClick={() => triggerAdminForm("project")}
              className="bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/10 self-start sm:self-auto hover:scale-[1.03] active:scale-95 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{language === "en" ? "Add Project" : "Tambah Proyek"}</span>
            </button>
          )}
        </div>

        {/* Categories togglers with round pills */}
        <div className={`flex flex-wrap justify-start gap-2 mb-10 pb-4 border-b ${
          isDark ? "border-white/[0.06]" : "border-slate-200/80"
        }`}>
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 font-sans text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ease-out hover:scale-[1.04] active:scale-95 cursor-pointer select-none tracking-wide ${
                filter === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15"
                  : isDark
                    ? "bg-white/[0.01] hover:bg-white/[0.04] text-slate-400 hover:text-white"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-950 border border-slate-200/50"
              }`}
              id={`filter-tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Project Grid with AnimatePresence layouts */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const cardVariants = {
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                show: (idx: number) => ({
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 90,
                    damping: 15,
                    delay: idx * 0.04,
                  }
                }),
                exit: {
                  opacity: 0,
                  scale: 0.96,
                  y: 15,
                  transition: { duration: 0.2, ease: "easeOut" }
                }
              };

              return (
                <motion.div
                  key={project.id}
                  layout
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className={`border rounded-2xl overflow-hidden group transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-0.5 flex flex-col justify-between shadow-lg relative ${
                    isDark
                      ? "border-white/[0.06] bg-[#11141B]/40 hover:bg-[#11141B]/80 hover:border-white/15 hover:shadow-indigo-500/[0.02]"
                      : "border-slate-200/80 bg-white hover:bg-slate-50/50 hover:border-slate-300 shadow-xl shadow-slate-100/50"
                  }`}
                  id={`project-card-${project.id}`}
                >
                {/* Visual Top block */}
                <div className="p-6 space-y-4">
                  {/* Inline Admin overlay actions bar inside each project card */}
                  {isAdmin && (
                    <div className="absolute top-3 right-3 z-10 flex gap-1 bg-slate-900/90 border border-white/10 p-1.5 rounded-xl backdrop-blur-sm">
                      <button
                        onClick={() => triggerAdminForm("project", project)}
                        className="text-indigo-400 hover:text-indigo-300 p-1 hover:bg-white/10 rounded-lg cursor-pointer transition"
                        title={language === "en" ? "Edit Project" : "Ubah Proyek"}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProject(project.id)}
                        className="text-red-400 hover:text-red-300 p-1 hover:bg-white/10 rounded-lg cursor-pointer transition"
                        title={language === "en" ? "Delete Project" : "Hapus Proyek"}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                      isDark ? "bg-white/[0.03] border-white/[0.06]" : "bg-slate-50 border-slate-200/60"
                    }`}>
                      {getCategoryIcon(project.category)}
                    </div>
                    {project.featured && (
                      <span className="font-sans text-[9px] bg-indigo-500/10 text-indigo-300 px-3 py-1 border border-indigo-500/15 rounded-full uppercase tracking-wider font-extrabold pr-10 sm:pr-3">
                        {language === "en" ? "FEATURED" : "UNGGULAN"}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-sans text-[10px] text-slate-500 uppercase tracking-widest font-bold block">
                      {getCategoryLabel(project.category)}
                    </span>
                    <h3 className={`text-lg font-bold tracking-tight transition-colors duration-200 ${
                      isDark ? "text-white group-hover:text-indigo-400" : "text-slate-900 group-hover:text-indigo-650 group-hover:text-indigo-600"
                    }`}>
                      {project.title}
                    </h3>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed font-normal ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}>
                    {project.description[language]}
                  </p>
                </div>

                {/* Tags and codes references footer segment */}
                <div className="p-6 pt-0 mt-auto">
                  <div className={`flex flex-wrap gap-1.5 mb-5 pt-4 border-t ${
                    isDark ? "border-white/[0.05]" : "border-slate-100"
                  }`}>
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className={`text-[10px] px-2.5 py-1 rounded-full font-medium border ${
                          isDark
                            ? "bg-white/[0.02] text-slate-400 border-white/[0.05]"
                            : "bg-slate-50 text-slate-600 border-slate-200/60"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-sans text-xs inline-flex items-center gap-1.5 font-bold cursor-pointer transition-all hover:translate-x-1 ${
                      isDark ? "text-indigo-400 hover:text-indigo-350" : "text-indigo-650 hover:text-indigo-500"
                    }`}
                    id={`git-link-${project.id}`}
                  >
                    <Github className={`w-4 h-4 ${isDark ? "text-indigo-400" : "text-indigo-650"}`} />
                    <span>{language === "en" ? "Source Code Repository" : "Buka Kode Sumber"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>
              </motion.div>
            )})}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
