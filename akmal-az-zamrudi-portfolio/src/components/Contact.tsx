import { useState, FormEvent } from "react";
import { Language } from "../types";
import { Mail, MapPin, Send, AlertCircle, CheckCircle2 } from "lucide-react";

interface ContactProps {
  language: Language;
  theme: "dark" | "light";
}

export default function Contact({ language, theme }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const isDark = theme === "dark";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    // Standard mailto compiler integration to guarantee delivery
    setTimeout(() => {
      setStatus("success");
      const bodyText = `${language === "en" ? "Sender" : "Pengirim"}: ${name}\n` +
                       `Email: ${email}\n\n` +
                       `${message}`;
      
      const mailtoUrl = `mailto:azamrudi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
      
      window.location.href = mailtoUrl;
    }, 1200);
  };

  const contactData = [
    {
      icon: <Mail className="w-5 h-5 text-indigo-400" />,
      label: language === "en" ? "Email Address" : "Alamat Surat",
      value: "azamrudi@gmail.com",
      href: "mailto:azamrudi@gmail.com",
    },
    {
      icon: <MapPin className="w-5 h-5 text-purple-400" />,
      label: language === "en" ? "Academic Base" : "Kampus Utama",
      value: "Malang, East Java, Indonesia",
      href: "https://maps.google.com/?q=UIN+Malik+Ibrahim+Malang",
    },
  ];

  return (
    <section id="contact" className={`py-24 sm:py-32 border-t transition-colors duration-500 relative overflow-hidden ${
      isDark ? "border-white/[0.05] bg-[#0C0E12]" : "border-slate-200 bg-white"
    }`}>
      <div className={`absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full filter blur-[120px] pointer-events-none ${
        isDark ? "bg-indigo-500/5" : "bg-indigo-400/2 bg-indigo-505/2"
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: direct inquiries detail channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/15 rounded-full text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5" />
                <span>{language === "en" ? "Connecting Channels" : "Media Hubungan"}</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none uppercase ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                {language === "en" ? "Let's Connect" : "Mulai Diskusi"}
              </h2>
            </div>

            <p className={`text-sm sm:text-base leading-relaxed font-normal ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}>
              {language === "en" ? (
                "I am actively exploring opportunities for academic collaborative research programs, graduate fellowships, and software system integrations. Feel free to reach out directly through any of these channels."
              ) : (
                "Saya sangat terbuka terhadap berbagai kolaborasi riset akademik fungsional, kemitraan proyek nirlaba, serta rekayasa sistem terintegrasi. Segera hubungi saya secara langsung melalui saluran kerja berikut."
              )}
            </p>

            {/* Direct Connect Hub list */}
            <div className="space-y-5 pt-2">
              {contactData.map((item, id) => (
                <div key={id} className={`flex items-center gap-4 border p-5 rounded-2xl transition-all duration-300 ease-out hover:scale-[1.025] hover:-translate-y-0.5 shadow-md ${
                  isDark
                    ? "bg-white/[0.015] border-white/[0.06] hover:border-white/15 hover:shadow-indigo-500/[0.02]"
                    : "bg-slate-50 border-slate-200/80 hover:bg-white hover:border-slate-300/80 hover:shadow-slate-100"
                }`}>
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${
                    isDark ? "bg-white/[0.03] border-white/[0.05]" : "bg-white border-slate-200/60"
                  }`}>
                    {item.icon}
                  </div>
                  <div>
                    <span className="block font-sans text-xs text-slate-500 font-bold uppercase tracking-wider">{item.label}</span>
                    <a href={item.href} className={`text-sm sm:text-base font-medium transition-colors duration-200 mt-0.5 block ${
                      isDark ? "text-slate-300 hover:text-indigo-400" : "text-slate-700 hover:text-indigo-650 hover:text-indigo-605"
                    }`}>
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interaction Sandbox Form */}
          <div className="lg:col-span-7">
            <div className={`border p-6 sm:p-8 rounded-2xl shadow-xl relative transition-all duration-300 ease-out ${
              isDark
                ? "border-white/[0.06] hover:border-white/12 bg-gradient-to-tr from-white/[0.02] to-white/[0.01] hover:shadow-indigo-500/[0.01]"
                : "border-slate-200/80 bg-white hover:border-slate-300 shadow-slate-100/50"
            }`}>
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className={`block font-sans text-[11px] font-bold uppercase tracking-wider ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}>
                      {language === "en" ? "Your Name" : "Nama Anda"}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Akmal"
                      className={`w-full border focus:ring-2 focus:outline-none rounded-xl px-4 py-3 text-xs sm:text-sm transition-all shadow-inner ${
                        isDark
                          ? "bg-[#0A0C10] border-white/[0.08] focus:border-indigo-500 focus:ring-indigo-500/10 text-white placeholder-slate-600"
                          : "bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/5 text-slate-900 placeholder-slate-400"
                      }`}
                      id="input-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`block font-sans text-[11px] font-bold uppercase tracking-wider ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}>
                      {language === "en" ? "Your Email" : "Alamat Surel"}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className={`w-full border focus:ring-2 focus:outline-none rounded-xl px-4 py-3 text-xs sm:text-sm transition-all shadow-inner ${
                        isDark
                          ? "bg-[#0A0C10] border-white/[0.08] focus:border-indigo-500 focus:ring-indigo-500/10 text-white placeholder-slate-600"
                          : "bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/5 text-slate-900 placeholder-slate-400"
                      }`}
                      id="input-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`block font-sans text-[11px] font-bold uppercase tracking-wider ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}>
                    {language === "en" ? "Subject/Topic" : "Topik Pesan"}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Research Collaboration Proposal"
                    className={`w-full border focus:ring-2 focus:outline-none rounded-xl px-4 py-3 text-xs sm:text-sm transition-all shadow-inner ${
                      isDark
                        ? "bg-[#0A0C10] border-white/[0.08] focus:border-[#4F46E5] focus:border-indigo-500 focus:ring-indigo-500/10 text-white placeholder-slate-600"
                        : "bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/5 text-slate-900 placeholder-slate-400"
                    }`}
                    id="input-subject"
                  />
                </div>

                <div className="space-y-2">
                  <label className={`block font-sans text-[11px] font-bold uppercase tracking-wider ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}>
                    {language === "en" ? "Message Content" : "Rincian Pesan"}
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="..."
                    className={`w-full border focus:ring-2 focus:outline-none rounded-xl px-4 py-3 text-xs sm:text-sm transition-all shadow-inner resize-none ${
                      isDark
                        ? "bg-[#0A0C10] border-white/[0.08] focus:border-indigo-500 focus:ring-indigo-500/10 text-white placeholder-slate-600"
                        : "bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/5 text-slate-900 placeholder-slate-400"
                    }`}
                    id="input-message"
                  ></textarea>
                </div>

                {/* Submit state warnings */}
                {status === "error" && (
                  <div className="flex items-center gap-2 p-3.5 border border-red-500/15 bg-red-950/20 rounded-xl text-xs sm:text-sm text-red-400">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{language === "en" ? "Please fill in all requested fields." : "Harap lengkapi semua bidang isian."}</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="flex items-center gap-2 p-3.5 border border-emerald-500/15 bg-emerald-950/20 rounded-xl text-xs sm:text-sm text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{language === "en" ? "Preparing email client redirect..." : "Membuka aplikasi surat surel bawaan..."}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-indigo-600 cursor-pointer text-white hover:bg-indigo-700 font-bold font-sans text-xs sm:text-sm py-4 rounded-xl transition-all duration-300 ease-out hover:scale-[1.015] active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-wide shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/30 disabled:opacity-50"
                  id="btn-contact-submit"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === "sending" ? (language === "en" ? "Redirecting..." : "Mengalihkan...") : (language === "en" ? "Send Message" : "Kirim Masukan")}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
