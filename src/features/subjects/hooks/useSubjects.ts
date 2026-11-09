'use client';
import { useCallback, useEffect, useState } from 'react';
import { subjectService } from '../services/subjects';
import type { Subject } from '../domain/types';
export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await subjectService.list(page, search);
      setSubjects(response.data);
      setTotal(response.pagination.total);
      setTotalPages(Math.max(1, response.pagination.totalPages));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudieron cargar las materias.');
    } finally {
      setLoading(false);
    }
  }, [page, search]);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  return { subjects, page, setPage, search, setSearch, total, totalPages, loading, error, refresh };
}
