'use client';

import { useState } from 'react';
import {
  FileText,
  FileCode,
  FileImage,
  File,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Download,
} from 'lucide-react';

import { useResources } from '../hooks/useResources';
import { useSubjects } from '@/src/features/subjects/hooks/useSubjects';
import { resourcesService } from '../services/resources';

function getFileIcon(fileType: string) {
  if (fileType.includes('image')) {
    return FileImage;
  }

  if (
    fileType.includes('javascript') ||
    fileType.includes('typescript') ||
    fileType.includes('text/plain')
  ) {
    return FileCode;
  }

  if (fileType.includes('pdf')) {
    return FileText;
  }

  return File;
}

export function ResourcesList() {
  const {
    resources,
    loading,
    deleting,
    error,
    search,
    page,
    totalPages,
    setPage,
    changeSearch,
    loadResources,
    removeResource,
    changeSubject,
    subjectId,
  } = useResources();
  const { subjects } = useSubjects();

  const [actionError, setActionError] = useState('');
  const [openingId, setOpeningId] = useState<string | null>(null);

  const handleOpen = async (id: string) => {
    setOpeningId(id);
    setActionError('');
    try {
      const resource = await resourcesService.getById(id);
      if (!resource.publicUrl || !resource.publicUrl.startsWith('https://')) {
        throw new Error('Este archivo aún no tiene un enlace de descarga disponible.');
      }
      window.location.assign(resource.publicUrl);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'No se pudo abrir el archivo.');
      setOpeningId(null);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('¿Seguro que deseas eliminar este material?');

    if (!confirmed) return;

    setActionError('');

    try {
      await removeResource(id);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'No se pudo eliminar el material.');
    }
  };

  return (
    <section className="card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Mis materiales</h2>

        <p className="mt-1 text-sm text-slate-500">Consulta y organiza tus archivos académicos.</p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
        <div className="relative">
          <Search
            aria-hidden="true"
            size={19}
            className="pointer-events-none absolute left-4 top-3.5 text-slate-400"
          />

          <input
            type="search"
            aria-label="Buscar materiales"
            placeholder="Buscar por nombre..."
            className="field search-field"
            value={search}
            onChange={(e) => changeSearch(e.target.value)}
          />
        </div>
        <select
          className="field"
          aria-label="Filtrar por materia"
          value={subjectId}
          onChange={(event) => changeSubject(event.target.value)}
        >
          <option value="">Todas las materias</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {actionError && (
        <div role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {actionError}
        </div>
      )}

      {loading ? (
        <p className="py-12 text-center text-slate-500">Cargando materiales...</p>
      ) : error ? (
        <div className="py-10 text-center">
          <p className="text-red-600">{error}</p>

          <button
            type="button"
            onClick={() => void loadResources()}
            className="mt-4 inline-flex items-center gap-2 font-semibold text-primary"
          >
            <RefreshCw size={17} />
            Reintentar
          </button>
        </div>
      ) : resources.length === 0 ? (
        <div className="py-12 text-center">
          <FileText size={44} className="mx-auto text-violet-300" />

          <h3 className="mt-4 font-bold">No se encontraron materiales</h3>

          <p className="mt-2 text-sm text-slate-500">Los documentos que subas aparecerán aquí.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {resources.map((resource) => {
            const Icon = getFileIcon(resource.fileType);

            return (
              <article
                key={resource.id}
                className="flex items-center gap-4 rounded-xl border border-slate-100 p-4"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-violet-100 text-primary">
                  <Icon size={23} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold">{resource.title}</h3>

                  <p className="mt-1 truncate text-xs text-slate-400">{resource.fileType}</p>
                </div>

                <button
                  type="button"
                  disabled={openingId === resource.id}
                  onClick={() => void handleOpen(resource.id)}
                  aria-label={`Abrir ${resource.title}`}
                  className="rounded-lg p-2 text-primary transition hover:bg-violet-50 disabled:opacity-50"
                  title="Ver o descargar"
                >
                  <Download size={19} />
                </button>
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => void handleDelete(resource.id)}
                  aria-label={`Eliminar ${resource.title}`}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                >
                  <Trash2 size={19} />
                </button>
              </article>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          aria-label="Página anterior"
          disabled={page <= 1 || loading}
          onClick={() => setPage(page - 1)}
          className="rounded-lg border p-2 disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="text-sm text-slate-500">
          Página {page} de {totalPages}
        </span>

        <button
          type="button"
          aria-label="Página siguiente"
          disabled={page >= totalPages || loading}
          onClick={() => setPage(page + 1)}
          className="rounded-lg border p-2 disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
