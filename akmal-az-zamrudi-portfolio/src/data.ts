import { Project, Publication, JourneyMilestone } from "./types";

export const PROJECTS_DATA: Project[] = [
  {
    id: "agv-line-nav",
    title: "Smart-Line Navigation AGV",
    category: "robotics_iot",
    description: {
      en: "Arduino-based Automated Guided Vehicle incorporating adaptive pathfinding, infrared line sensor tracking array, and smart physical weight-classification mechanics.",
      id: "Automated Guided Vehicle berbasis Arduino yang mengintegrasikan navigasl garis adaptif, sensor infrared array, dan klasifikasi berat muatan secara fisik."
    },
    technologies: ["Arduino IDE", "Infrared Array", "C++", "L293D Driver", "Weight Sensors"],
    githubUrl: "https://github.com/Azamrudi/Smart-Line-Navigation-AGV",
    featured: true
  },
  {
    id: "banana-ripeness",
    title: "Computer Vision Banana Ripeness",
    category: "ai_cv",
    description: {
      en: "A real-time image processing pipeline engineered using HSV (Hue Saturation Value) color space segmentation algorithms in OpenCV for fast ripeness diagnostics without deep learning latency.",
      id: "Pipeline pemrosesan citra real-time menggunakan segmentasi ruang warna HSV pada pustaka OpenCV untuk klasifikasi kematangan pisang secara instan tanpa latensi pembelajaran mendalam."
    },
    technologies: ["OpenCV", "Python", "HSV Color Space", "Jupyter Notebooks", "NumPy"],
    githubUrl: "https://github.com/Azamrudi/banana-ripeness-detection",
    featured: true
  },
  {
    id: "obstacle-avoidance",
    title: "Obstacle-Avoiding Robot",
    category: "robotics_iot",
    description: {
      en: "An autonomous wheeled robot powered by Arduino Uno, calculating non-colliding navigation paths through ultrasonic ranging vectors and responsive servo sweep algorithms.",
      id: "Robot beroda otonom berbasis Arduino Uno yang melakukan navigasi adaptif melalui pancaran ultrasonik HC-SR04 dan algoritma pemindaian servo dinamis."
    },
    technologies: ["Arduino Uno", "HC-SR04 Ultrasonic", "Servo Motor", "C/C++", "Motor Control"],
    githubUrl: "https://github.com/Azamrudi/Obstacle-Avoiding-Robot",
    featured: true
  },
  {
    id: "sentiment-analysis",
    title: "X Sentiment Classifier (Naive Bayes)",
    category: "ai_cv",
    description: {
      en: "A Natural Language Processing model deploying Naïve Bayes classifiers to clean, process, and accurately segment consumer sentiments on social media posts regarding public health policies.",
      id: "Model Klasifikasi NLP menggunakan algoritma Naïve Bayes untuk membersihkan, memproses, dan memetakan sentimen konsumen di media sosial terkait regulasi kesehatan publik."
    },
    technologies: ["Python", "NLTK", "Naive Bayes Classifier", "Scikit-Learn", "Pandas"],
    githubUrl: "https://github.com/Azamrudi/x-sentiment-analysis",
    featured: false
  },
  {
    id: "e-santri",
    title: "E-Santri Student Assessment",
    category: "web_cli",
    description: {
      en: "A secure evaluation database and report management platform designed for educational systems to archive assessments and visualize students' holistic progression.",
      id: "Pangkalan data penilaian terstruktur dan platform manajemen raport digital untuk ekosistem sekolah dalam merekam dan memetakan performa akademik siswa secara berkala."
    },
    technologies: ["HTML5", "Tailwind CSS", "PHP/JavaScript", "Relational Database"],
    githubUrl: "https://github.com/Azamrudi/e-santri",
    featured: false
  },
  {
    id: "cli-utilities",
    title: "Low-Level CLI & Simulations",
    category: "web_cli",
    description: {
      en: "A series of mathematical utilities including terminal calculator systems and POSIX block storage simulations comparing filesystem efficiency across block Sizes.",
      id: "Kompilasi utilitas numerik konsol termasuk kalkulator teks terminal serta simulasi dampak efisiensi alokasi block-size pada media penyimpanan Linux."
    },
    technologies: ["Python", "CLI Engine", "POSIX APIs", "Systems Programming"],
    githubUrl: "https://github.com/Azamrudi",
    featured: false
  }
];

export const PUBLICATIONS_DATA: Publication[] = [
  {
    id: "llm-requirements-2025",
    title: "Evaluasi Akurasi dan Presisi Large Language Model (LLM) dalam Generasi User Story untuk Perangkat Lunak",
    journal: "Jurnal Ilmiah Informatika (Jurnal Nasional Terakreditasi)",
    year: 2025,
    authors: "M. Akmaluddin Az Zamrudi, Maulana Nur Rokhim, Muhammad Ainul Yaqin",
    tags: ["LLM Evaluation", "NLP Benchmarking", "Empirical Systems Science"],
    abstract: {
      en: "This peer-reviewed comparative study benchmarks top-tier Large Language Models (Gemini 2.5, ChatGPT-4.0, and DeepSeek) on their ability to specify precise and consistent Software Engineering requirements (User Stories). Using natural language translation evaluation metrics including BLEU-4, ROUGE-L, and METEOR, we mathematically scored linguistic precision and structure. The results showed Gemini leading in syntax consistency and requirement elicitation standards.",
      id: "Riset komparatif terakreditasi ini menguji performa model bahasa besar terkemuka (Gemini 2.5, ChatGPT-4.0, dan DeepSeek) dalam menyusun spesifikasi kebutuhan perangkat lunak (User Story) secara presisi. Melalui penerapan metrik evaluasi bahasa alami formal seperti BLEU-4, ROUGE-L, dan METEOR, kami menilai ketepatan sintaksis dan kelengkapan semantik. Hasil penelitian menunjukkan keunggulan Gemini dalam konsistensi struktural."
    },
    metrics: [
      { label: "BLEU-4 Accuracy Score", value: "0.84 (Gemini Peak)" },
      { label: "ROUGE-L F1 Metric", value: "0.89" },
      { label: "METEOR Semantic Fit", value: "0.81" },
      { label: "EVALUATED RUNS", value: "120+ Prompt Flows" }
    ],
    url: "https://www.researchgate.net/profile/M-Akmaluddin-Az-Zamrudi"
  }
];

export const MILESTONES_DATA: JourneyMilestone[] = [
  {
    id: "milestone-1",
    period: "2025 - PRESENT",
    title: {
      en: "Senior Informatics Student & Scientific Collaborator",
      id: "Mahasiswa Informatika Utama & Kolaborator Ilmiah"
    },
    organization: {
      en: "UIN Maulana Malik Ibrahim Malang",
      id: "UIN Maulana Malik Ibrahim Malang"
    },
    details: {
      en: "Leading research on empirical evaluation metrics for Large Language Models. Co-authored and peer-reviewed high-impact research papers linking natural language processing to software engineering metrics (BLEU, ROUGE).",
      id: "Memimpin penelitian empiris terkait standardisasi uji kualitas model bahasa besar (LLM). Menulis serta merilis artikel ilmiah tentang korelasi pengolahan bahasa alami terhadap rekayasa sistem perangkat lunak."
    },
    colorClass: "cyan"
  },
  {
    id: "milestone-2",
    period: "2023 - 2024",
    title: {
      en: "Entry to Informatics & System Engineering Lab",
      id: "Awal Studi Informatika & Eksplorasi Sistem Fisik"
    },
    organization: {
      en: "UIN Maulana Malik Ibrahim Malang",
      id: "UIN Maulana Malik Ibrahim Malang"
    },
    details: {
      en: "Acquired fundamental computing stacks in hardware-software interfaces. Engineered line-follower Automated Guided Vehicles (AGVs) using Arduino, ESP32, infrared array telemetry, and ultrasonic navigation schemas.",
      id: "Menguasai dasar rekayasa integrasi fisik-digital. Merancang robot beroda pandu garis (AGV) berbasis sensor infra merah serta algoritma otonom penghindar rintangan berbasis modul mikrokontroler."
    },
    colorClass: "emerald"
  },
  {
    id: "milestone-3",
    period: "DEC 2022 - FEB 2023",
    title: {
      en: "Secretary & Head Multimedia System Operator",
      id: "Sekretaris & Penanggung Jawab Sistem Multimedia"
    },
    organization: {
      en: "Pondok Pesantren Az-Zikra DDI, Batulicin",
      id: "Pondok Pesantren Az-Zikra DDI, Batulicin"
    },
    details: {
      en: "Coordinated technical administration, formal documentation, and engineered the OBS Studio switching layout feed on outdoor high-definition LED displays for their major cultural event catering to 1,000+ live spectators.",
      id: "Mengkoordinasi administrasi persuratan, pengarsipan resmi, serta bertindak sebagai kepala pengarah transisi multimedia digital (OBS & High-Density LED Screens) pada panggung kesenian tahunan berkapasitas 1.000+ hadirin."
    },
    colorClass: "slate"
  }
];

export const STRATEGIC_BIO = {
  hook: {
    en: "WHERE EMPIRICAL ALGORITHMS INTERFACE WITH PHYSICAL SYSTEM DESIGN",
    id: "SINKRONISASI ALGORITMA CERDAS TERHADAP REKAYASA SISTEM FISIK"
  },
  summary: {
    en: "I am a meticulous Informatics student at UIN Malang. My work concentrates at the intersection of AI modeling, lightweight Computer Vision (HSV segmentation pipelines), autonomous embedded robotics (AGVs), and scientific Large Language Model evaluation benchmarking.",
    id: "Saya adalah mahasiswa Teknik Informatika di UIN Malang dengan komitmen tinggi pada akurasi riset. Fokus saya terletak pada persimpangan rekayasa kecerdasan buatan, Computer Vision deterministik (segmentasi HSV), robotika cerdas (AGV), dan standar uji empiris LLM."
  }
};
