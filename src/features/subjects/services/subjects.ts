import { http } from '@/src/features/common/services/http';
import type { ListResponse } from '@/src/features/common/domain/api';
import type { Subject } from '../domain/types';
export const subjectService = {
  list: (page = 1, search = '') =>
    http<ListResponse<Subject>>(
      `/api/subjects?page=${page}&limit=9&search=${encodeURIComponent(search)}`,
    ),
  create: (name: string, academicPeriodId: string) =>
    http<{ data: Subject }>('/api/subjects', {
      method: 'POST',
      body: JSON.stringify({ name, academicPeriodId }),
    }),
  update: (id: string, name: string, academicPeriodId: string) =>
    http<{ data: Subject }>(`/api/subjects/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify({ name, academicPeriodId }),
    }),
  remove: (id: string) =>
    http<{ data: Subject }>(`/api/subjects/${encodeURIComponent(id)}`, { method: 'DELETE' }),
};
