import { Language, JourneyMilestone } from "../types";
import { Calendar, Compass, Briefcase, GraduationCap, Edit, Trash2, Plus } from "lucide-react";
import { triggerAdminForm } from "./AdminConsole";

interface JourneyProps {
  language: Language;
  theme: "dark" | "light";
  milestones: JourneyMilestone[];
  isAdmin: boolean;
  onDeleteMilestone: (id: string) => Promise<void>;
}

export default function Journey({ 
  language, 
  theme, 
  milestones, 
  isAdmin, 
  onDeleteMilestone 
}: JourneyProps) {
  const isDark = theme === "dark";

  const getOrgIcon = (id: string) => {
    // Check keyword features for custom icons dynamically
    const lId = id.toLowerCase();
    if (lId.includes("milestone-1") || lId.includes("education") || lId.includes("universitas") || lId.includes("school")) {
      return <GraduationCap className={`w-4 h-4 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />;
    } else if (lId.includes("milestone-2") || lId.includes("organization") || lId.includes("volunteering") || lId.includes("community")) {
      return <Compass className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-purple-600"}`} />;
    } else {
      return <Briefcase className={`w-4 h-4 ${isDark ? "text-pink-400" : "text-pink-650 text-indigo-600"}`} />;
    }
  };

  // Sort milestones by period or year descending safely to represent a proper reverse-chronological order
  const sortedMilestones = [...milestones].sort((a, b) => {
    const aYear = parseInt(a.period.split("-")[0] || "0") || 0;
    const bYear = parseInt(b.period.split("-")[0] || "0") || 0;
    return bYear - aYear; // Descending
  });

  return (
    <section id="journey" className={`py-24 sm:py-32 border-t transition-colors duration-500 relative ${
      isDark ? "border-white/[0.05] bg-[#0A0C10]" : "border-slate-200 bg-[#F8FAFC]"
    }`}>
      <div className={`absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full filter blur-[100px] pointer-events-none ${
        isDark ? "bg-purple-500/5" : "bg-purple-400/2 bg-purple-500/2"
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Title with premium badge */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/15 rounded-full text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{language === "en" ? "Academic Milestones" : "Garis Waktu Perjalanan"}</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none uppercase ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              {language === "en" ? "My Journey" : "Riwayat Pendidikan & Aktivitas"}
            </h2>
          </div>

          {isAdmin && (
            <button
              onClick={() => triggerAdminForm("milestone")}
              className="bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/10 hover:scale-[1.03] active:scale-95 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{language === "en" ? "Add Milestone" : "Tambah Riwayat"}</span>
            </button>
          )}
        </div>

        {/* Timeline construct - with beautiful soft gradient left border link */}
        <div className="max-w-4xl mx-auto relative pl-2">
          {/* Vertical central path line */}
          <div className="absolute left-[8px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-indigo-500/50 via-purple-500/40 to-pink-500/10 animate-pulse"></div>

          {/* Timeline entries list */}
          <div className="space-y-12">
            {sortedMilestones.map((milestone) => (
              <div 
                key={milestone.id} 
                className="relative pl-8 md:pl-12 group"
                id={`journey-milestone-${milestone.id}`}
              >
                {/* Timeline circle pulse point design */}
                <div 
                  className={`absolute left-[-1px] top-2 z-10 w-4.5 h-4.5 rounded-full border flex items-center justify-center p-0.5 group-hover:border-indigo-400 transition-colors duration-300 shadow-md ${
                    isDark ? "bg-[#0A0C10] border-indigo-400/80" : "bg-[#F8FAFC] border-indigo-650"
                  }`}
                  title={milestone.period}
                >
                  <div className={`w-1.5 h-1.5 rounded-full group-hover:scale-125 transition-transform duration-300 ${
                    isDark ? "bg-indigo-400" : "bg-indigo-600"
                  }`}></div>
                </div>

                {/* Card block - high end studio element */}
                <div className={`space-y-4 p-6 sm:p-7 border rounded-2xl shadow-xl transition-all duration-300 ease-out hover:scale-[1.015] hover:-translate-y-0.5 relative ${
                  isDark
                    ? "border-white/[0.06] bg-[#11141B]/30 hover:bg-[#11141B]/60 hover:border-white/15 hover:shadow-indigo-500/[0.02]"
                    : "border-slate-200/80 bg-white hover:bg-slate-50/50 hover:border-slate-300 shadow-slate-100/50"
                }`}>
                  {/* Inline Admin overlay actions bar inside each milestone card */}
                  {isAdmin && (
                    <div className="absolute top-4 right-4 z-10 flex gap-1 bg-slate-900/90 border border-white/10 p-1.5 rounded-xl backdrop-blur-sm">
                      <button
                        onClick={() => triggerAdminForm("milestone", milestone)}
                        className="text-indigo-400 hover:text-indigo-300 p-1 hover:bg-white/10 rounded-lg cursor-pointer transition"
                        title={language === "en" ? "Edit Milestone" : "Ubah Riwayat"}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteMilestone(milestone.id)}
                        className="text-red-400 hover:text-red-300 p-1 hover:bg-white/10 rounded-lg cursor-pointer transition"
                        title={language === "en" ? "Delete Milestone" : "Hapus Riwayat"}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
                    isDark ? "border-white/[0.05]" : "border-slate-100"
                  }`}>
                    <span className="inline-flex items-center gap-2 font-sans text-xs font-bold text-indigo-300 bg-indigo-500/10 py-1.5 px-3.5 rounded-full border border-indigo-500/15 max-w-fit leading-none shadow-sm pr-10 sm:pr-3">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{milestone.period}</span>
                    </span>
                    
                    <span className={`inline-flex items-center gap-2 font-sans text-xs font-bold tracking-tight pr-10 sm:pr-0 ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}>
                      {getOrgIcon(milestone.id)}
                      <span>{milestone.organization[language]}</span>
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold tracking-tight leading-snug transition-colors duration-200 ${
                    isDark ? "text-white group-hover:text-indigo-400" : "text-slate-900 group-hover:text-indigo-650 group-hover:text-indigo-600"
                  }`}>
                    {milestone.title[language]}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed font-normal ${
                    isDark ? "text-[#94A3B8]" : "text-slate-650 text-slate-600"
                  }`}>
                    {milestone.details[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
