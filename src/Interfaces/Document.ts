export interface Document {
  id?: string;
  title: string;
  description: string;
  course: string;
  university: string;
  faculty: string;
  department: string;
  like_count?: number;
  dislike_count?: number;
  report_count?: number;
  file?: any;
  date: string;
  user: string;
}

export interface DocumentState {
  documents: Document[];
  loading: boolean;
}
