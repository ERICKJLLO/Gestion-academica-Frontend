export interface AcademicPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePeriodData {
  name: string;
  startDate: string;
  endDate: string;
}

export type UpdatePeriodData = Partial<CreatePeriodData>;
