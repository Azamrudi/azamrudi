import React, { useState, useEffect } from "react";
import { Project, Publication, JourneyMilestone, Language } from "../types";
import { Plus, X, Tag, Info, ToggleLeft, ToggleRight, Trash2, Edit, Save } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminConsoleProps {
  language: Language;
  theme: "dark" | "light";
  onSaveProject: (project: Project) => Promise<void>;
  onSavePublication: (pub: Publication) => Promise<void>;
  onSaveMilestone: (milestone: JourneyMilestone) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
  onDeletePublication: (id: string) => Promise<void>;
  onDeleteMilestone: (id: string) => Promise<void>;
}

// Global modal types
export type ModalType = "project" | "publication" | "milestone" | null;

interface ProjectFormProps {
  isDark: boolean;
  language: Language;
  onClose: () => void;
  onSave: (project: Project) => void;
  initialData?: Project;
}

function ProjectForm({ isDark, language, onClose, onSave, initialData }: ProjectFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState<Project["category"]>(initialData?.category || "ai_cv");
  const [descEn, setDescEn] = useState(initialData?.description.en || "");
  const [descId, setDescId] = useState(initialData?.description.id || "");
  const [techString, setTechString] = useState(initialData?.technologies.join(", ") || "");
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !descEn || !descId || !githubUrl) {
      alert(language === "en" ? "Please fill in all required fields" : "Harap isi semua bidang wajib");
      return;
    }

    const project: Project = {
      id: initialData?.id || `proj-${Date.now()}`,
      title,
      category,
      description: { en: descEn, id: descId },
      technologies: techString.split(",").map(t => t.trim()).filter(Boolean),
      githubUrl,
      featured,
    };
    onSave(project);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
          {language === "en" ? "Project Title *" : "Judul Proyek *"}
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Smart Autonomous AGV"
          className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
            isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
          }`}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Category" : "Kategori"}
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Project["category"])}
            className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
          >
            <option value="ai_cv">Computer Vision & AI</option>
            <option value="robotics_iot">Robotics & IoT Systems</option>
            <option value="web_cli">Software & CLI Utilities</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "GitHub Repository URL *" : "Tautan Repositori GitHub *"}
          </label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/..."
            className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Description (English) *" : "Deskripsi (Inggris) *"}
          </label>
          <textarea
            rows={3}
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            placeholder="Brief English summary of the engineering work..."
            className={`w-full border rounded-xl px-4 py-2.5 text-sm resize-none ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Description (Indonesian) *" : "Deskripsi (Indonesia) *"}
          </label>
          <textarea
            rows={3}
            value={descId}
            onChange={(e) => setDescId(e.target.value)}
            placeholder="Ringkasan bahasa indonesia tentang sistem rekayasa..."
            className={`w-full border rounded-xl px-4 py-2.5 text-sm resize-none ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
          {language === "en" ? "Technologies / Stack (Comma separated) *" : "Teknologi / Stack (Pisahkan dengan koma) *"}
        </label>
        <input
          type="text"
          value={techString}
          onChange={(e) => setTechString(e.target.value)}
          placeholder="e.g. Arduino IDE, OpenCV, C++, Python"
          className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
            isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
          }`}
          required
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => setFeatured(!featured)}
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-left transition ${
            isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {featured ? (
            <ToggleRight className="w-6 h-6 text-indigo-500" />
          ) : (
            <ToggleLeft className="w-6 h-6 text-slate-400" />
          )}
          <span>{language === "en" ? "Featured Portfolio Project" : "Tandai sebagai Proyek Unggulan"}</span>
        </button>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.05]">
        <button
          type="button"
          onClick={onClose}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer ${
            isDark ? "hover:bg-white/[0.05] text-slate-400" : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          {language === "en" ? "Cancel" : "Batal"}
        </button>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{language === "en" ? "Save Project" : "Simpan Proyek"}</span>
        </button>
      </div>
    </form>
  );
}

interface PublicationFormProps {
  isDark: boolean;
  language: Language;
  onClose: () => void;
  onSave: (pub: Publication) => void;
  initialData?: Publication;
}

function PublicationForm({ isDark, language, onClose, onSave, initialData }: PublicationFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [journal, setJournal] = useState(initialData?.journal || "");
  const [year, setYear] = useState<number>(initialData?.year || new Date().getFullYear());
  const [authors, setAuthors] = useState(initialData?.authors || "");
  const [tagString, setTagString] = useState(initialData?.tags.join(", ") || "");
  const [abstractEn, setAbstractEn] = useState(initialData?.abstract.en || "");
  const [abstractId, setAbstractId] = useState(initialData?.abstract.id || "");
  const [url, setUrl] = useState(initialData?.url || "");

  // Structured performance metrics for the metrics grid representation
  const [metric1Label, setMetric1Label] = useState(initialData?.metrics[0]?.label || "BLEU-4 Accuracy Score");
  const [metric1Value, setMetric1Value] = useState(initialData?.metrics[0]?.value || "0.84");
  const [metric2Label, setMetric2Label] = useState(initialData?.metrics[1]?.label || "ROUGE-L F1 Metric");
  const [metric2Value, setMetric2Value] = useState(initialData?.metrics[1]?.value || "0.89");
  const [metric3Label, setMetric3Label] = useState(initialData?.metrics[2]?.label || "METEOR Semantic Fit");
  const [metric3Value, setMetric3Value] = useState(initialData?.metrics[2]?.value || "0.81");
  const [metric4Label, setMetric4Label] = useState(initialData?.metrics[3]?.label || "EVALUATED RUNS");
  const [metric4Value, setMetric4Value] = useState(initialData?.metrics[3]?.value || "120+ Prompt Flows");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !journal || !authors || !abstractEn || !abstractId || !url) {
      alert(language === "en" ? "Please fill in all required fields" : "Harap isi semua bidang wajib");
      return;
    }

    const pub: Publication = {
      id: initialData?.id || `pub-${Date.now()}`,
      title,
      journal,
      year: Number(year),
      authors,
      tags: tagString.split(",").map(t => t.trim()).filter(Boolean),
      abstract: { en: abstractEn, id: abstractId },
      metrics: [
        { label: metric1Label, value: metric1Value },
        { label: metric2Label, value: metric2Value },
        { label: metric3Label, value: metric3Value },
        { label: metric4Label, value: metric4Value },
      ],
      url,
    };
    onSave(pub);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
          {language === "en" ? "Research / Paper Title *" : "Judul Paper/Riset *"}
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Evaluasi Akurasi Large Language Model..."
          className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
            isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
          }`}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Journal Name / Publisher *" : "Nama Jurnal / Penerbit *"}
          </label>
          <input
            type="text"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="e.g. Jurnal Ilmiah Informatika (Nasional SINTA)"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Publication Year *" : "Tahun Publikasi *"}
          </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Authors / Contributors *" : "Penulis / Kolaborator *"}
          </label>
          <input
            type="text"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            placeholder="M. Akmaluddin Az Zamrudi, Maulana Nur Rokhim"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "ResearchGate or PDF Link *" : "Tautan ResearchGate / PDF *"}
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Abstract (English) *" : "Abstrak (Inggris) *"}
          </label>
          <textarea
            rows={3}
            value={abstractEn}
            onChange={(e) => setAbstractEn(e.target.value)}
            placeholder="Scientific abstract summing NLP/LLM methodology..."
            className={`w-full border rounded-xl px-4 py-2.5 text-sm resize-none ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Abstract (Indonesian) *" : "Abstrak (Indonesia) *"}
          </label>
          <textarea
            rows={3}
            value={abstractId}
            onChange={(e) => setAbstractId(e.target.value)}
            placeholder="Abstrak riset ilmiah metode pembandingan LLM..."
            className={`w-full border rounded-xl px-4 py-2.5 text-sm resize-none ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
          {language === "en" ? "Scientific Tags (Comma separated)" : "Kata Kunci / Tag Riset (Pisahkan koma)"}
        </label>
        <input
          type="text"
          value={tagString}
          onChange={(e) => setTagString(e.target.value)}
          placeholder="e.g. LLM Evaluation, NLP Benchmarking, Empirical Systems"
          className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
            isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
          }`}
        />
      </div>

      <div className="space-y-2 p-3 border rounded-xl border-dashed border-white/10 bg-white/[0.01]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
          {language === "en" ? "Performance Metrics Grid (Optional)" : "Metrik & Akurasi Penelitian"}
        </span>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={metric1Label}
            onChange={(e) => setMetric1Label(e.target.value)}
            className={`px-3 py-1.5 text-xs rounded-lg border ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            placeholder="Metric 1 Name"
          />
          <input
            type="text"
            value={metric1Value}
            onChange={(e) => setMetric1Value(e.target.value)}
            className={`px-3 py-1.5 text-xs rounded-lg border ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            placeholder="Metric 1 Value"
          />
          <input
            type="text"
            value={metric2Label}
            onChange={(e) => setMetric2Label(e.target.value)}
            className={`px-3 py-1.5 text-xs rounded-lg border ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            placeholder="Metric 2 Name"
          />
          <input
            type="text"
            value={metric2Value}
            onChange={(e) => setMetric2Value(e.target.value)}
            className={`px-3 py-1.5 text-xs rounded-lg border ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            placeholder="Metric 2 Value"
          />
          <input
            type="text"
            value={metric3Label}
            onChange={(e) => setMetric3Label(e.target.value)}
            className={`px-3 py-1.5 text-xs rounded-lg border ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            placeholder="Metric 3 Name"
          />
          <input
            type="text"
            value={metric3Value}
            onChange={(e) => setMetric3Value(e.target.value)}
            className={`px-3 py-1.5 text-xs rounded-lg border ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            placeholder="Metric 3 Value"
          />
          <input
            type="text"
            value={metric4Label}
            onChange={(e) => setMetric4Label(e.target.value)}
            className={`px-3 py-1.5 text-xs rounded-lg border ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            placeholder="Metric 4 Name"
          />
          <input
            type="text"
            value={metric4Value}
            onChange={(e) => setMetric4Value(e.target.value)}
            className={`px-3 py-1.5 text-xs rounded-lg border ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            placeholder="Metric 4 Value"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.05]">
        <button
          type="button"
          onClick={onClose}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer ${
            isDark ? "hover:bg-white/[0.05] text-slate-400" : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          {language === "en" ? "Cancel" : "Batal"}
        </button>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{language === "en" ? "Save Publication" : "Simpan Dokumen"}</span>
        </button>
      </div>
    </form>
  );
}

interface MilestoneFormProps {
  isDark: boolean;
  language: Language;
  onClose: () => void;
  onSave: (m: JourneyMilestone) => void;
  initialData?: JourneyMilestone;
}

function MilestoneForm({ isDark, language, onClose, onSave, initialData }: MilestoneFormProps) {
  const [period, setPeriod] = useState(initialData?.period || "");
  const [titleEn, setTitleEn] = useState(initialData?.title.en || "");
  const [titleId, setTitleId] = useState(initialData?.title.id || "");
  const [orgEn, setOrgEn] = useState(initialData?.organization.en || "");
  const [orgId, setOrgId] = useState(initialData?.organization.id || "");
  const [detailsEn, setDetailsEn] = useState(initialData?.details.en || "");
  const [detailsId, setDetailsId] = useState(initialData?.details.id || "");
  const [colorClass, setColorClass] = useState<JourneyMilestone["colorClass"]>(initialData?.colorClass || "cyan");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!period || !titleEn || !titleId || !orgEn || !orgId || !detailsEn || !detailsId) {
      alert(language === "en" ? "Please fill in all fields" : "Harap isi semua bidang form");
      return;
    }

    const m: JourneyMilestone = {
      id: initialData?.id || `milestone-${Date.now()}`,
      period,
      title: { en: titleEn, id: titleId },
      organization: { en: orgEn, id: orgId },
      details: { en: detailsEn, id: detailsId },
      colorClass,
    };
    onSave(m);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Time Period *" : "Periode Waktu *"}
          </label>
          <input
            type="text"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            placeholder="e.g. 2025 - PRESENT or DEC 2023"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Visual Accent Color" : "Warna Aksen Visual"}
          </label>
          <select
            value={colorClass}
            onChange={(e) => setColorClass(e.target.value as JourneyMilestone["colorClass"])}
            className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
          >
            <option value="cyan">Cyan (Academic/Tech)</option>
            <option value="emerald">Emerald (Success/Robot)</option>
            <option value="slate">Slate (Volunteer/Admin)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Role Title (English) *" : "Jabatan / Gelar (Inggris) *"}
          </label>
          <input
            type="text"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            placeholder="e.g. Media Operator & Visual Switcher"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Role Title (Indonesian) *" : "Jabatan / Gelar (Indonesia) *"}
          </label>
          <input
            type="text"
            value={titleId}
            onChange={(e) => setTitleId(e.target.value)}
            placeholder="e.g. Operator Media & Switcher Video"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Organization (English) *" : "Instansi / Organisasi (Inggris) *"}
          </label>
          <input
            type="text"
            value={orgEn}
            onChange={(e) => setOrgEn(e.target.value)}
            placeholder="e.g. Malik Ibrahim State Campus"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Organization (Indonesian) *" : "Instansi / Organisasi (Indonesia) *"}
          </label>
          <input
            type="text"
            value={orgId}
            onChange={(e) => setOrgId(e.target.value)}
            placeholder="e.g. UIN Maulana Malik Ibrahim Malang"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Details (English) *" : "Keterangan (Inggris) *"}
          </label>
          <textarea
            rows={3}
            value={detailsEn}
            onChange={(e) => setDetailsEn(e.target.value)}
            placeholder="Coordinated real-time video transitions and live feeds..."
            className={`w-full border rounded-xl px-4 py-2.5 text-sm resize-none ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider block text-slate-400">
            {language === "en" ? "Details (Indonesian) *" : "Keterangan (Indonesia) *"}
          </label>
          <textarea
            rows={3}
            value={detailsId}
            onChange={(e) => setDetailsId(e.target.value)}
            placeholder="Mengoordinir transisi video siaran dan orkestrasi alat fisik..."
            className={`w-full border rounded-xl px-4 py-2.5 text-sm resize-none ${
              isDark ? "bg-[#0A0C10] border-white/[0.08] text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.05]">
        <button
          type="button"
          onClick={onClose}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer ${
            isDark ? "hover:bg-white/[0.05] text-slate-400" : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          {language === "en" ? "Cancel" : "Batal"}
        </button>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{language === "en" ? "Save Milestone" : "Simpan Garis Waktu"}</span>
        </button>
      </div>
    </form>
  );
}

export default function AdminConsole({
  language,
  theme,
  onSaveProject,
  onSavePublication,
  onSaveMilestone,
  onDeleteProject,
  onDeletePublication,
  onDeleteMilestone,
}: AdminConsoleProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [editData, setEditData] = useState<any>(null);
  const [isSubmitPending, setIsSubmitPending] = useState(false);

  const isDark = theme === "dark";

  // Global listener to easily open models based on window events for decoupling!
  useEffect(() => {
    const handleOpenModal = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: ModalType; data?: any }>;
      setActiveModal(customEvent.detail.type);
      setEditData(customEvent.detail.data || null);
    };

    window.addEventListener("open-admin-form", handleOpenModal);
    return () => {
      window.removeEventListener("open-admin-form", handleOpenModal);
    };
  }, []);

  const closeModal = () => {
    setActiveModal(null);
    setEditData(null);
  };

  const handleSaveProject = async (proj: Project) => {
    setIsSubmitPending(true);
    await onSaveProject(proj);
    setIsSubmitPending(false);
    closeModal();
  };

  const handleSavePublication = async (pub: Publication) => {
    setIsSubmitPending(true);
    await onSavePublication(pub);
    setIsSubmitPending(false);
    closeModal();
  };

  const handleSaveMilestone = async (m: JourneyMilestone) => {
    setIsSubmitPending(true);
    await onSaveMilestone(m);
    setIsSubmitPending(false);
    closeModal();
  };

  if (!activeModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Semi-transparent backdrop blur card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
        ></motion.div>

        {/* Modal Window layout contents */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`w-full max-w-3xl border rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 overflow-y-auto max-h-[90vh] transition-colors duration-300 ${
            isDark
              ? "bg-[#0C0E12] border-white/[0.08] shadow-indigo-500/[0.02]"
              : "bg-white border-slate-200 shadow-slate-100"
          }`}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className={`absolute top-5 right-5 p-2 rounded-full border cursor-pointer transition ${
              isDark
                ? "border-white/[0.05] hover:bg-white/[0.05] text-slate-400 hover:text-white"
                : "border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon indicator & title block */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center">
              <Plus className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-indigo-400 block leading-none">
                {language === "en" ? "ADMIN CO-WORK CONSOLE" : "KONSOL ADMIN PORTFOLIO"}
              </span>
              <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight mt-1 leading-none ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                {editData 
                  ? (language === "en" ? `Edit ${activeModal}` : `Ubah ${activeModal}`) 
                  : (language === "en" ? `Add New ${activeModal}` : `Tambah ${activeModal} Baru`)}
              </h2>
            </div>
          </div>

          {/* Form branch selection */}
          <div className="pt-2">
            {activeModal === "project" && (
              <ProjectForm
                isDark={isDark}
                language={language}
                onClose={closeModal}
                onSave={handleSaveProject}
                initialData={editData}
              />
            )}
            {activeModal === "publication" && (
              <PublicationForm
                isDark={isDark}
                language={language}
                onClose={closeModal}
                onSave={handleSavePublication}
                initialData={editData}
              />
            )}
            {activeModal === "milestone" && (
              <MilestoneForm
                isDark={isDark}
                language={language}
                onClose={closeModal}
                onSave={handleSaveMilestone}
                initialData={editData}
              />
            )}
          </div>

          {/* Pending spinner block */}
          {isSubmitPending && (
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20">
              <div className="h-10 w-10 border-4 border-t-indigo-500 border-indigo-500/20 rounded-full animate-spin"></div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Global utility helper to trigger admin forms from anywhere in the codebase!
export function triggerAdminForm(type: ModalType, data?: any) {
  const event = new CustomEvent("open-admin-form", { detail: { type, data } });
  window.dispatchEvent(event);
}
