"use client";

import { useRef, useState, type FormEvent } from "react";
import { FileUp, BookOpen } from "lucide-react";

import { AppShell } from "@/src/features/common/components/AppShell";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { useSubjects } from "@/src/features/subjects/hooks/useSubjects";

import { resourcesService } from "@/src/features/resources/services/resources";
import { ResourcesList } from "@/src/features/resources/components/ResourcesList";

export default function RecursosPage() {
  const { user } = useAuth();
  const { subjects, loading: loadingSubjects } = useSubjects();

  const fileInput = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [listVersion, setListVersion] = useState(0);

  const handleUpload = async (event: FormEvent) => {
    event.preventDefault();

    setError("");
    setStatus("");

    if (!file || !user) {
      setError("Selecciona un archivo e inicia sesión.");
      return;
    }

    if (!subjectId) {
      setError("Selecciona una materia.");
      return;
    }

    setBusy(true);

    try {
      await resourcesService.upload(
        file,
        title.trim(),
        subjectId,
        user.id
      );

      setStatus("El archivo se subió correctamente.");

      setFile(null);
      setTitle("");
      setSubjectId("");

      if (fileInput.current) {
        fileInput.current.value = "";
      }

      setListVersion((version) => version + 1);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo subir el archivo."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppShell
      title="Biblioteca académica"
      subtitle="Organiza y consulta tus materiales de estudio."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={handleUpload}
          className="card space-y-5 p-7"
        >
          <div className="flex items-center gap-3">
            <FileUp className="text-primary" size={25} />

            <h2 className="text-xl font-bold">
              Subir material
            </h2>
          </div>

          <label className="block text-sm font-semibold">
            Título del material

            <input
              required
              className="field mt-2"
              placeholder="Ej. Taller de bases de datos"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className="block text-sm font-semibold">
            Materia

            <select
              required
              className="field mt-2"
              value={subjectId}
              disabled={loadingSubjects || subjects.length === 0}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              <option value="">
                {loadingSubjects
                  ? "Cargando materias..."
                  : "Selecciona una materia"}
              </option>

              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-semibold">
            Archivo

            <input
              ref={fileInput}
              required
              type="file"
              className="mt-2 block w-full rounded-xl border border-dashed border-slate-300 p-4 text-sm"
              onChange={(e) =>
                setFile(e.target.files?.[0] ?? null)
              }
            />
          </label>

          {error && (
            <div
              role="alert"
              className="rounded-xl bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {status && (
            <div
              role="status"
              className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700"
            >
              {status}
            </div>
          )}

          <button
            type="submit"
            disabled={busy || subjects.length === 0}
            className="btn-primary w-full"
          >
            <FileUp size={18} />

            {busy ? "Subiendo..." : "Subir archivo"}
          </button>
        </form>

        <div className="card flex flex-col items-center justify-center p-8 text-center">
          <BookOpen size={45} className="text-violet-300" />

          <h2 className="mt-5 text-xl font-bold">
            Tus materiales organizados
          </h2>

          <p className="mt-3 leading-7 text-slate-500">
            Guarda talleres, apuntes y documentos relacionados
            con tus materias para encontrarlos fácilmente.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <ResourcesList key={listVersion} />
      </div>
    </AppShell>
  );
}
