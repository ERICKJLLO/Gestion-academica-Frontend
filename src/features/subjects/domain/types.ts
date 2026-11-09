export type Subject = {
  id: string;
  name: string;
  academicPeriodId: string;
  createdAt: string;
  deletedAt?: string | null;
  period?: { id: string; name: string };
};
export type AcademicPeriod = { id: string; name: string; startDate: string; endDate: string };
