"use client";

import { useCallback, useEffect, useState } from "react";

import { periodsService } from "../services/periods";

import type {
  AcademicPeriod,
  CreatePeriodData,
  UpdatePeriodData,
} from "../domain/types";

export function usePeriods() {
  const [periods, setPeriods] = useState<AcademicPeriod[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadPeriods = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await periodsService.getAll();
      setPeriods(response.data);
      setTotal(response.pagination.total);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudieron cargar los períodos."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPeriods();
  }, [loadPeriods]);

  const createPeriod = async (data: CreatePeriodData) => {
    setSaving(true);

    try {
      await periodsService.create(data);
      await loadPeriods();
    } finally {
      setSaving(false);
    }
  };

  const updatePeriod = async (
    id: string,
    data: UpdatePeriodData
  ) => {
    setSaving(true);

    try {
      await periodsService.update(id, data);
      await loadPeriods();
    } finally {
      setSaving(false);
    }
  };

  const deletePeriod = async (id: string) => {
    setSaving(true);

    try {
      await periodsService.delete(id);
      await loadPeriods();
    } finally {
      setSaving(false);
    }
  };

  return {
    periods,
    total,
    loading,
    saving,
    error,
    loadPeriods,
    createPeriod,
    updatePeriod,
    deletePeriod,
  };
}
