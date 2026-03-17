export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  impact: string;
  status: "completed" | "ongoing" | "concept";
  tags: string[];
  image: string;
  metrics: { label: string; value: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}
