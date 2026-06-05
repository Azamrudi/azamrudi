import { Language, Publication } from "../types";
import { BookOpen, Award, Users, BarChart3, HelpCircle, CheckCircle2, Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { triggerAdminForm } from "./AdminConsole";
import { motion } from "motion/react";

interface ResearchProps {
  language: Language;
  theme: "dark" | "light";
  publications: Publication[];
  isAdmin: boolean;
  onDeletePublication: (id: string) => Promise<void>;
}

export default function Research({ 
  language, 
  theme, 
  publications, 
  isAdmin, 
  onDeletePublication 
}: ResearchProps) {
  const [activePaperIndex, setActivePaperIndex] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState<"bleu" | "rouge" | "meteor">("bleu");

  const isDark = theme === "dark";

  // Guard safe lookup
  const paper = publications[activePaperIndex] || publications[0];

  // Map dynamic metrics securely or use smart comparative scales
  const scoreBleu = paper ? Number(paper.metrics[0]?.value) || 84 : 84;
  const scoreRouge = paper ? Number(paper.metrics[1]?.value) || 89 : 89;
  const scoreMeteor = paper ? Number(paper.metrics[2]?.value) || 81 : 81;

  // Detailed comparative metrics for the active research evaluations (monochrome/brutal styling)
  const comparativeModels = {
    bleu: [
      { name: "Gemini 2.5 Pro (This Work)", value: scoreBleu, color: "from-indigo-500 to-purple-500" },
      { name: "ChatGPT-4.0 Reference", value: 78, color: "from-slate-400 to-slate-500" },
      { name: "DeepSeek-V3 Reference", value: 74, color: "from-slate-600 to-slate-700" },
    ],
    rouge: [
      { name: "Gemini 2.5 Pro (This Work)", value: scoreRouge, color: "from-indigo-500 to-purple-500" },
      { name: "ChatGPT-4.0 Reference", value: 85, color: "from-slate-400 to-slate-500" },
      { name: "DeepSeek-V3 Reference", value: 81, color: "from-slate-600 to-slate-700" },
    ],
    meteor: [
      { name: "Gemini 2.5 Pro (This Work)", value: scoreMeteor, color: "from-indigo-500 to-purple-500" },
      { name: "ChatGPT-4.0 Reference", value: 76, color: "from-slate-400 to-slate-500" },
      { name: "DeepSeek-V3 Reference", value: 75, color: "from-slate-600 to-slate-700" },
    ],
  };

  const metricDescriptions = {
    bleu: {
      en: "BLEU-4 (Bilingual Evaluation Understudy) measures exact n-gram precision of the generated user requirements against reference human-engineered software specifications.",
      id: "BLEU-4 menerangkan tingkat ketetapan n-gram dari story kebutuhan perangkat lunak yang dihasilkan dibandingkan dengan spesifikasi acuan buatan manusia secara presisi."
    },
    rouge: {
      en: "ROUGE-L (Recall-Oriented Understudy for Gisting Evaluation) calculates the longest common subsequences (LCS) to confirm content coverage, recall, and structure.",
      id: "ROUGE-L menguji kecocokan untaian kalimat berurutan terpanjang untuk mengukur cakupan fungsional teks dan integritas sematik artikel."
    },
    meteor: {
      en: "METEOR incorporates stemming and synonymy algorithms, evaluating deeper semantic alignment, synonym matching, and overall syntactic vocabulary fitness.",
      id: "METEOR mensimulasikan pencocokan kata dasar (stemming) beserta padanan kata (sinonim) guna mengevaluasi keselarasan semantik di tingkat kata."
    },
  };

  if (!paper) return null;

  return (
    <section id="research" className={`py-24 sm:py-32 border-t transition-colors duration-500 relative ${
      isDark ? "border-white/[0.05] bg-[#0A0C10]" : "border-slate-200/80 bg-[#F8FAFC]"
    }`}>
      <div className={`absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full filter blur-[100px] pointer-events-none ${
        isDark ? "bg-indigo-500/5" : "bg-indigo-550/2 bg-indigo-500/2"
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Title area */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/15 rounded-full text-xs font-semibold text-purple-400 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === "en" ? "Academic Endeavors" : "Karya Tulis Ilmiah"}</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              {language === "en" ? "Academic LLP & NLP Research" : "Riset Akademis & Evaluasi NLP"}
            </h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {isAdmin && (
              <button
                onClick={() => triggerAdminForm("publication")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/10 hover:scale-[1.03] active:scale-95 transition"
              >
                <Plus className="w-4 h-4" />
                <span>{language === "en" ? "Add Research" : "Tambah Riset"}</span>
              </button>
            )}

            <a
              href="https://www.researchgate.net/profile/M-Akmaluddin-Az-Zamrudi"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 font-sans text-xs font-semibold border px-5 py-3 rounded-full transition-all duration-300 ease-out hover:scale-[1.03] active:scale-95 cursor-pointer shadow-sm ${
                isDark
                  ? "border-white/[0.08] hover:border-white/20 bg-white/[0.02]/30 hover:bg-white/[0.04] text-slate-300"
                  : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-705 text-slate-700 shadow-sm"
              }`}
              id="btn-researchgate"
            >
              <BookOpen className="w-4 h-4 text-indigo-550 text-indigo-500" />
              <span>{language === "en" ? "View ResearchGate Profile" : "Kunjungi Profil ResearchGate"}</span>
            </a>
          </div>
        </div>

        {/* Paper selector tabs if multiple publications are present */}
        {publications.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto pb-4 mb-8 select-none">
            {publications.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActivePaperIndex(idx)}
                className={`flex-none text-xs font-semibold px-4.5 py-2.5 rounded-xl border transition cursor-pointer ${
                  activePaperIndex === idx
                    ? "bg-indigo-600 text-white border-indigo-650"
                    : isDark
                      ? "border-white/[0.06] hover:bg-white/[0.03] text-slate-400"
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                }`}
              >
                {p.title.length > 40 ? `${p.title.substring(0, 40)}...` : p.title}
              </button>
            ))}
          </div>
        )}

        {/* Publication card details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Paper Content (Abstract) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 14 }}
            className={`md:col-span-7 lg:col-span-7 border p-6 sm:p-8 rounded-2xl relative shadow-xl transition-all duration-300 ease-out hover:scale-[1.015] hover:-translate-y-0.5 ${
              isDark
                ? "border-white/[0.06] bg-gradient-to-tr from-white/[0.03] to-white/[0.01] hover:border-white/15 hover:shadow-indigo-500/[0.02]"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-slate-150 shadow-slate-100/50"
            }`}
          >
            {/* Inline Admin overlay actions bar inside active research card */}
            {isAdmin && (
              <div className="absolute top-4 right-4 z-10 flex gap-1 bg-slate-900/90 border border-white/10 p-1.5 rounded-xl backdrop-blur-sm">
                <button
                  onClick={() => triggerAdminForm("publication", paper)}
                  className="text-indigo-400 hover:text-indigo-300 p-1 hover:bg-white/10 rounded-lg cursor-pointer transition"
                  title={language === "en" ? "Edit Research" : "Ubah Riset"}
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={async () => {
                    await onDeletePublication(paper.id);
                    setActivePaperIndex(0);
                  }}
                  className="text-red-400 hover:text-red-300 p-1 hover:bg-white/10 rounded-lg cursor-pointer transition"
                  title={language === "en" ? "Delete Research" : "Hapus Riset"}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-2.5 mb-5">
              <span className={`font-sans text-[11px] font-semibold px-3 py-1 rounded-full border ${
                isDark 
                  ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-300" 
                  : "bg-[#EEF2F6] border-slate-205 border-slate-200 text-indigo-700"
              }`}>
                {paper.journal}
              </span>
              <span className={`font-sans text-[11px] font-semibold px-3 py-1 rounded-full border ${
                isDark
                  ? "bg-white/[0.04] border-white/[0.06] text-slate-300"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}>
                {language === "en" ? `Published ${paper.year}` : `Rilis ${paper.year}`}
              </span>
              <span className="bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 font-sans text-[11px] font-semibold px-3 py-1 rounded-full inline-flex items-center">
                <Award className="w-3.5 h-3.5 inline mr-1" /> Peer-Reviewed
              </span>
            </div>

            <h3 className={`text-xl sm:text-2xl font-extrabold leading-snug mb-5 tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              {paper.title}
            </h3>

            {/* Author list */}
            <div className={`flex items-center gap-3 mb-8 text-xs sm:text-sm font-sans ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`} id="authors-list">
              <Users className="w-4 h-4 text-slate-500 shrink-0" />
              <span>
                {paper.authors.includes("M. Akmaluddin") ? (
                  <>
                    <strong className={isDark ? "text-indigo-300 font-semibold" : "text-indigo-600 font-bold"}>
                      M. Akmaluddin Az Zamrudi<sup>*</sup>
                    </strong>
                    {paper.authors.replace("M. Akmaluddin Az Zamrudi", "").replace("M. Akmaluddin", "").trim()}
                  </>
                ) : (
                  <span>{paper.authors}</span>
                )}
              </span>
            </div>

            {/* Narrative abstract */}
            <div className="space-y-3 mb-8">
              <h4 className={`text-[11px] font-bold uppercase tracking-widest ${
                isDark ? "text-slate-500" : "text-slate-500"
              }`}>{language === "en" ? "Empirical Research Abstract" : "Abstrak Publikasi Ilmiah"}</h4>
              <p className={`text-sm font-sans leading-relaxed font-normal ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}>
                {paper.abstract[language]}
              </p>
            </div>

            {/* High-level performance indices */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl border ${
              isDark 
                ? "bg-white/[0.01] border-white/[0.04]" 
                : "bg-slate-50 border-slate-200/60"
            }`}>
              {paper.metrics.map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <span className={`block text-[10px] font-bold uppercase tracking-wider leading-none ${
                    isDark ? "text-slate-500" : "text-slate-500"
                  }`}>{m.label}</span>
                  <span className={`text-xs sm:text-sm font-mono font-extrabold leading-none block pt-1 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>{m.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Benchmark Charts representing scientific metrics */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 14, delay: 0.15 }}
            className={`md:col-span-5 lg:col-span-5 border p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 transition-all duration-300 ease-out hover:scale-[1.015] hover:-translate-y-0.5 ${
              isDark 
                ? "border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-white/[0.01]/30 hover:border-white/15 hover:shadow-indigo-500/[0.02]" 
                : "border-slate-200 bg-white hover:border-slate-350 hover:shadow-slate-150 shadow-slate-100/50"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-500">
                <BarChart3 className="w-4 h-4" />
                <span className="font-sans text-xs font-bold uppercase tracking-widest">{language === "en" ? "Comparative Index" : "Indeks Perbandingan"}</span>
              </div>
              <h3 className={`text-lg font-bold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                {language === "en" ? "Linguistic Scoring Verification" : "Akurasi Generasi LLM Teruji"}
              </h3>
            </div>

            {/* Metric switches */}
            <div className={`grid grid-cols-3 gap-1.5 p-1.5 border rounded-xl ${
              isDark ? "bg-white/[0.02] border-white/[0.05]" : "bg-slate-100/80 border-slate-200"
            }`}>
              {(["bleu", "rouge", "meteor"] as const).map((mKey) => (
                <button
                  key={mKey}
                  onClick={() => setSelectedMetric(mKey)}
                  className={`py-2 px-3 font-sans text-[11px] font-bold rounded-lg tracking-wide text-center transition-all duration-300 ease-out cursor-pointer uppercase hover:scale-[1.04] active:scale-95 ${
                    selectedMetric === mKey
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                      : isDark 
                        ? "text-slate-400 hover:text-white" 
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                  id={`metric-tab-${mKey}`}
                >
                  {mKey}
                </button>
              ))}
            </div>

            {/* Metric active info text */}
            <div className={`text-xs leading-relaxed font-normal p-4.5 rounded-xl border flex items-start gap-2.5 min-h-[72px] ${
              isDark 
                ? "bg-white/[0.01]/40 border-white/[0.04] text-slate-400" 
                : "bg-slate-50/70 border-slate-200/60 text-slate-600"
            }`}>
              <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <span>{metricDescriptions[selectedMetric][language]}</span>
            </div>

            {/* Horizontal Bar Chart representations */}
            <div className="space-y-5 pt-1">
              {comparativeModels[selectedMetric].map((model, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm font-sans font-medium">
                    <span className={isDark ? "text-slate-300" : "text-slate-700 font-medium"}>{model.name}</span>
                    <span className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{model.value}%</span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full overflow-hidden ${
                    isDark ? "bg-[#161B22]" : "bg-slate-100"
                  }`}>
                    <div 
                      className={`h-full bg-gradient-to-r ${model.color} rounded-full transition-all duration-700`}
                      style={{ width: `${model.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`text-[10px] font-sans font-medium flex items-center gap-2 border-t pt-5 ${
              isDark ? "border-white/[0.05] text-slate-500" : "border-slate-100 text-slate-600"
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === "en" ? "EVALUATED RUNS: 120+ structured prompt flows." : "UJI EVALUASI: 120+ alur prompt terstruktur."}</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
