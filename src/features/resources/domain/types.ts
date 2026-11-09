export interface AcademicResource {
  id: string;
  title: string;
  fileUrl: string;
  fileType: string;
  subjectId: string;
  uploadedById: string;
  createdAt: string;
  publicUrl?: string;
}

export interface ResourceFilters {
  subjectId?: string;
  search?: string;
  page?: number;
  limit?: number;
}
