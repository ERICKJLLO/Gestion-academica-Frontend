"use client";

import { useState, type FormEvent } from "react";
import {
  CalendarDays,
  Plus,
  Pencil,
  Trash2,
  X,
  RefreshCw,
} from "lucide-react";

import { usePeriods } from "../hooks/usePeriods";
import type {
  AcademicPeriod,
  CreatePeriodData,
} from "../domain/types";

const emptyForm: CreatePeriodData = {
  name: "",
  startDate: "",
  endDate: "",
};

export function PeriodsPanel() {
  const {
    periods,
    loading,
    saving,
    error,
    loadPeriods,
    createPeriod,
    updatePeriod,
    deletePeriod,
  } = usePeriods();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<AcademicPeriod | null>(null);
  const [form, setForm] = useState<CreatePeriodData>(emptyForm);
  const [formError, setFormError] = useState("");
  const [actionError, setActionError] = useState("");

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormError("");
    setShowForm(true);
  };

  const openEdit = (period: AcademicPeriod) => {
    setEditing(period);

    setForm({
      name: period.name,
      startDate: period.startDate.slice(0, 10),
      endDate: period.endDate.slice(0, 10),
    });

    setFormError("");
    setShowForm(true);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError("");

    if (!form.name.trim()) {
      setFormError("Escribe el nombre del período.");
      return;
    }

    if (form.endDate < form.startDate) {
      setFormError(
        "La fecha de finalización no puede ser anterior a la de inicio."
      );
      return;
    }

    try {
      const data = {
        ...form,
        name: form.name.trim(),
      };

      if (editing) {
        await updatePeriod(editing.id, data);
      } else {
        await createPeriod(data);
      }

      setShowForm(false);
      setEditing(null);
      setForm(emptyForm);
      setActionError("");
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "No se pudo guardar el período."
      );
    }
  };

  const handleDelete = async (period: AcademicPeriod) => {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar "${period.name}"?`
    );

    if (!confirmed) return;

    setActionError("");

    try {
      await deletePeriod(period.id);
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : "No se pudo eliminar el período."
      );
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">Mis períodos</h2>
          <p className="mt-1 text-sm text-slate-500">
            Organiza tus materias por semestre.
          </p>
        </div>

        <button onClick={openCreate} className="btn-primary">
          <Plus size={18} />
          Nuevo período
        </button>
      </div>

      {actionError && (
        <div role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">
          {actionError}
        </div>
      )}

      {loading ? (
        <div className="card p-12 text-center text-slate-500">
          Cargando períodos...
        </div>
      ) : error ? (
        <div className="card p-10 text-center">
          <p className="text-red-600">{error}</p>

          <button
            onClick={() => void loadPeriods()}
            className="mt-4 inline-flex items-center gap-2 font-semibold text-primary"
          >
            <RefreshCw size={17} />
            Reintentar
          </button>
        </div>
      ) : periods.length === 0 ? (
        <div className="card p-14 text-center">
          <CalendarDays
            size={48}
            className="mx-auto text-violet-300"
          />

          <h3 className="mt-5 text-xl font-bold">
            Todavía no tienes períodos
          </h3>

          <p className="mt-2 text-slate-500">
            Crea tu primer semestre para comenzar a organizar tus materias.
          </p>

          <button onClick={openCreate} className="btn-primary mt-6">
            <Plus size={18} />
            Crear período
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {periods.map((period) => (
            <article key={period.id} className="card p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-violet-100 text-primary">
                  <CalendarDays size={24} />
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Registrado
                </span>
              </div>

              <h3 className="text-xl font-bold">{period.name}</h3>

              <div className="mt-4 space-y-2 text-sm text-slate-500">
                <p>
                  <strong>Inicio:</strong>{" "}
                  {period.startDate.slice(0, 10)}
                </p>

                <p>
                  <strong>Finalización:</strong>{" "}
                  {period.endDate.slice(0, 10)}
                </p>
              </div>

              <div className="mt-6 flex gap-3 border-t pt-4">
                <button
                  onClick={() => openEdit(period)}
                  className="flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  <Pencil size={16} />
                  Editar
                </button>

                <button
                  disabled={saving}
                  onClick={() => void handleDelete(period)}
                  className="ml-auto flex items-center gap-2 text-sm font-semibold text-red-500 disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="period-form-title"
            className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 id="period-form-title" className="text-2xl font-bold">
                {editing ? "Editar período" : "Nuevo período"}
              </h2>

              <button
                onClick={() => setShowForm(false)}
                aria-label="Cerrar formulario"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block text-sm font-semibold">
                Nombre del período
                <input
                  required
                  className="field mt-2"
                  placeholder="Ej. Semestre 2026-2"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </label>

              <label className="block text-sm font-semibold">
                Fecha de inicio
                <input
                  required
                  type="date"
                  className="field mt-2"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                />
              </label>

              <label className="block text-sm font-semibold">
                Fecha de finalización
                <input
                  required
                  type="date"
                  className="field mt-2"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm({ ...form, endDate: e.target.value })
                  }
                />
              </label>

              {formError && (
                <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                  {formError}
                </p>
              )}

              <button type="submit"
                disabled={saving}
                className="btn-primary w-full"
              >
                {saving
                  ? "Guardando..."
                  : editing
                    ? "Guardar cambios"
                    : "Crear período"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

