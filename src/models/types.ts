export interface PersonalInfo {
  fullName: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  github: string;
  linkedin: string;
  bio: string;
  photoURL?: string;
}
export interface Education {
  id?: string; // pour Firestore doc ID
  title: string;
  institution: string;
  startDate: string;  // ou Date, mais string simple suffit au début
  endDate?: string;
  description?: string;
}
export interface Experience {
  id?: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description?: string;
}
