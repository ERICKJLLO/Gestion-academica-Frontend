'use client';

import { useCallback, useEffect, useState } from 'react';

import { resourcesService } from '../services/resources';

import type { AcademicResource } from '../domain/types';

export function useResources() {
  const [resources, setResources] = useState<AcademicResource[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadResources = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await resourcesService.getAll({
        search,
        subjectId,
        page,
        limit: 10,
      });

      setResources(response.data);
      setTotal(response.pagination.total);
      setTotalPages(Math.max(1, response.pagination.totalPages));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudieron cargar los materiales.');
    } finally {
      setLoading(false);
    }
  }, [search, subjectId, page]);

  useEffect(() => {
    void loadResources();
  }, [loadResources]);

  const removeResource = async (id: string) => {
    setDeleting(true);

    try {
      await resourcesService.delete(id);
      await loadResources();
    } finally {
      setDeleting(false);
    }
  };

  const changeSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const changeSubject = (value: string) => {
    setSubjectId(value);
    setPage(1);
  };

  return {
    resources,
    total,
    loading,
    deleting,
    error,
    search,
    subjectId,
    page,
    totalPages,
    setPage,
    changeSearch,
    changeSubject,
    loadResources,
    removeResource,
  };
}
