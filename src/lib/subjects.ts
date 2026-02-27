// Multi-subject configuration
// Each subject has its own teacher, student pool, and URL slug

export interface SubjectConfig {
  slug: string;
  name: string;
  code: string;
  teacherName: string;
  teacherEmail: string;
  icon: "cloud" | "globe"; // for UI rendering
  color: "blue" | "emerald"; // theme color per subject
  description: string;
}

export const SUBJECTS: SubjectConfig[] = [
  {
    slug: "cloud-computing",
    name: "Cloud Computing",
    code: "CC",
    teacherName: "Sanketh Gujjar U",
    teacherEmail: "sanketh.gujjar@teacher.com",
    icon: "cloud",
    color: "blue",
    description: "Module Tests & Internal Tests for Cloud Computing",
  },
  {
    slug: "gis",
    name: "Geographic Information Systems",
    code: "BCV654",
    teacherName: "Dr. Harish Kumar S",
    teacherEmail: "harish.kumar@teacher.com",
    icon: "globe",
    color: "emerald",
    description: "Module Tests & Internal Tests for GIS (Open Elective)",
  },
];

export function getSubjectBySlug(slug: string): SubjectConfig | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

export function getSubjectByTeacherEmail(email: string): SubjectConfig | undefined {
  return SUBJECTS.find((s) => s.teacherEmail === email);
}

export function getAllSlugs(): string[] {
  return SUBJECTS.map((s) => s.slug);
}
