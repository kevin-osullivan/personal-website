export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export interface Research {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  paperUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
}

export interface Profile {
  name: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  bio?: string;
  location?: string;
  avatar?: string;
} 