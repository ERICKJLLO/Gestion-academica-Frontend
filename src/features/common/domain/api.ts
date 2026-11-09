export type ApiErrorPayload = { error?: string; message?: string };
export type Pagination = {
  total: number;
  currentPage?: number;
  page?: number;
  limit: number;
  totalPages: number;
};
export type ListResponse<T> = { data: T[]; pagination: Pagination };
