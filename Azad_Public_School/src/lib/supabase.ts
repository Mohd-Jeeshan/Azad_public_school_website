import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type AdmissionApplication = {
  id: string;
  student_name: string;
  parent_name: string;
  email: string;
  phone: string;
  grade_applying_for: string;
  previous_school: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

export type Subject = {
  subject: string;
  marks: number;
  total: number;
};

export type Result = {
  id: string;
  student_name: string;
  roll_number: string;
  grade: string;
  exam_term: string;
  subjects: Subject[];
  total_marks: number;
  max_marks: number;
  percentage: number;
  grade_letter: string;
  rank: string | null;
  created_at: string;
};

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  content: string | null;
  category: string;
  image_url: string | null;
  date: string;
  created_at: string;
};
