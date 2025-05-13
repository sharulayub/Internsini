export interface Company {
  name: string;
  logo: string;
}

export interface Internship {
  id: number;
  company: Company;
  position: string;
  location: string;
  workType: string;
  duration: string;
  postedDate: string;
  description: string;
  applicationUrl: string;
}

export interface FilterOptions {
  industry?: string;
  location?: string;
  workType?: string;
  duration?: string;
}

export interface AdminStats {
  total: number;
  active: number;
  expired: number;
}