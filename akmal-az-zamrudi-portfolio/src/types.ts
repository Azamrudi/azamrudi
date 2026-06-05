export type Language = "en" | "id";

export interface BilingualText {
  en: string;
  id: string;
}

export interface Project {
  id: string;
  title: string;
  category: "ai_cv" | "robotics_iot" | "web_cli";
  description: BilingualText;
  details?: BilingualText;
  technologies: string[];
  githubUrl: string;
  featured: boolean;
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: number;
  authors: string;
  tags: string[];
  abstract: BilingualText;
  metrics: { label: string; value: string }[];
  url: string;
}

export interface JourneyMilestone {
  id: string;
  period: string;
  title: BilingualText;
  organization: BilingualText;
  details: BilingualText;
  colorClass: "cyan" | "emerald" | "slate";
}
