export interface Student {
  id: string;
  usn: string;
  name: string;
  created_at: string;
}

export interface Mark {
  id: string;
  student_id: string;
  subject: string;
  marks: number;
  created_at: string;
  updated_at: string;
}

export interface StudentWithMarks extends Student {
  marks: Mark[];
}

export interface ActionResponse {
  success: boolean;
  message: string;
  data?: unknown;
}
