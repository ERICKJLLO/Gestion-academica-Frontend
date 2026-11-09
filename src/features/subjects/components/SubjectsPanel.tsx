'use client';
import { useState, type FormEvent } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw,
  Pencil,
} from 'lucide-react';
import { useSubjects } from '../hooks/useSubjects';
import { subjectService } from '../services/subjects';
import type { Subject } from '../domain/types';
import { usePeriods } from '@/src/features/academic-periods/hooks/usePeriods';
export function SubjectsPanel() {
  const { subjects, page, setPage, search, setSearch, totalPages, loading, error, refresh } =
    useSubjects();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [periodId, setPeriodId] = useState('');
  const [editing, setEditing] = useState<Subject | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const { periods, loading: loadingPeriods, error: periodsError, loadPeriods } = usePeriods();
  const create = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setActionError('');
    try {
      if (editing) {
        await subjectService.update(editing.id, name.trim(), periodId.trim());
      } else {
        await subjectService.create(name.trim(), periodId.trim());
      }
      setEditing(null);
      setOpen(false);
      setName('');
      setPeriodId('');
      await refresh();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'No se pudo crear.');
    } finally {
      setSaving(false);
    }
  };
  const remove = async (id: string) => {
    if (!window.confirm('¿Quieres eliminar esta materia? Esta acción la ocultará de los listados.'))
      return;
    setDeleting(id);
    setActionError('');
    try {
      await subjectService.remove(id);
      await refresh();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'No se pudo eliminar.');
    } finally {
      setDeleting(null);
    }
  };
  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-3.5 text-slate-400"
            size={19}
          />
          <input
            aria-label="Buscar materias"
            className="field search-field"
            placeholder="Buscar una materia…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setEditing(null);
            setName('');
            setPeriodId('');
            setOpen(true);
            setActionError('');
          }}
        >
          <Plus size={19} />
          Nueva materia
        </button>
      </div>
      {actionError && (
        <div role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">
          {actionError}
        </div>
      )}
      {loading ? (
        <div className="card p-12 text-center text-slate-500">Cargando materias…</div>
      ) : error ? (
        <div className="card p-10 text-center">
          <p className="text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => void refresh()}
            className="mt-4 inline-flex items-center gap-2 font-bold text-primary"
          >
            <RefreshCw size={16} />
            Reintentar
          </button>
        </div>
      ) : subjects.length === 0 ? (
        <div className="card p-16 text-center">
          <BookOpen className="mx-auto text-violet-300" size={44} />
          <h2 className="mt-4 text-xl font-bold">Todavía no hay materias</h2>
          <p className="mt-2 text-slate-500">Cuando agregues materias, aparecerán aquí.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject, i) => (
            <article className="card p-6" key={subject.id}>
              <span
                className={`mb-5 grid h-12 w-12 place-items-center rounded-xl ${['bg-violet-100 text-violet-600', 'bg-cyan-100 text-cyan-600', 'bg-amber-100 text-amber-600'][i % 3]}`}
              >
                <BookOpen size={22} />
              </span>
              <h2 className="mb-2 text-lg font-extrabold">{subject.name}</h2>
              <p className="truncate text-sm text-slate-500" title={subject.period?.name}>
                Período:{' '}
                {subject.period?.name ??
                  periods.find((period) => period.id === subject.academicPeriodId)?.name ??
                  'Sin nombre disponible'}
              </p>
              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <span className="text-xs font-semibold text-emerald-600">Activa</span>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(subject);
                    setName(subject.name);
                    setPeriodId(subject.academicPeriodId);
                    setActionError('');
                    setOpen(true);
                  }}
                  className="flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  <Pencil size={16} />
                  Editar
                </button>
                <button
                  type="button"
                  disabled={deleting === subject.id}
                  onClick={() => void remove(subject.id)}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-red-600 disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      <div className="mt-7 flex items-center justify-end gap-3">
        <button
          aria-label="Página anterior"
          disabled={page <= 1 || loading}
          className="rounded-xl border bg-white p-2 disabled:opacity-40"
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm text-slate-500">
          Página {page} de {totalPages}
        </span>
        <button
          aria-label="Página siguiente"
          disabled={page >= totalPages || loading}
          className="rounded-xl border bg-white p-2 disabled:opacity-40"
          onClick={() => setPage(page + 1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-subject"
            className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 id="new-subject" className="text-2xl font-bold">
                {editing ? 'Editar materia' : 'Nueva materia'}
              </h2>
              <button aria-label="Cerrar" onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>
            <p className="mb-5 text-sm text-slate-500">
              Selecciona la materia y el período académico al que pertenece.
            </p>
            <form onSubmit={create} className="space-y-4">
              <label className="block text-sm font-bold">
                Nombre de la materia
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="field mt-2"
                  placeholder="Ej. Desarrollo web"
                />
              </label>
              <label className="block text-sm font-bold">
                Período académico
                <select
                  required
                  className="field mt-2"
                  value={periodId}
                  onChange={(e) => setPeriodId(e.target.value)}
                  disabled={loadingPeriods || periods.length === 0}
                >
                  <option value="">
                    {loadingPeriods ? 'Cargando períodos...' : 'Selecciona un semestre'}
                  </option>
                  {periods.map((period) => (
                    <option key={period.id} value={period.id}>
                      {period.name}
                    </option>
                  ))}
                </select>
              </label>
              {periodsError && (
                <p role="alert" className="text-sm text-red-600">
                  {periodsError}
                  <button
                    type="button"
                    onClick={() => void loadPeriods()}
                    className="ml-2 font-semibold underline"
                  >
                    Reintentar
                  </button>
                </p>
              )}
              {!loadingPeriods && !periodsError && periods.length === 0 && (
                <p className="text-sm text-amber-700">
                  Primero debes registrar un período académico.
                </p>
              )}
              {actionError && (
                <p role="alert" className="text-sm text-red-600">
                  {actionError}
                </p>
              )}
              <button type="submit" disabled={saving} className="btn-primary w-full">
                {saving ? 'Guardando…' : editing ? 'Guardar cambios' : 'Guardar materia'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
