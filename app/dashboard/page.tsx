'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarDays, FolderOpen, Lightbulb } from 'lucide-react';
import { AppShell } from '@/src/features/common/components/AppShell';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import { useSubjects } from '@/src/features/subjects/hooks/useSubjects';
import { usePeriods } from '@/src/features/academic-periods/hooks/usePeriods';
import { useResources } from '@/src/features/resources/hooks/useResources';

export default function Dashboard() {
  const { user } = useAuth();
  const subjects = useSubjects();
  const periods = usePeriods();
  const resources = useResources();

  const cards = [
    { href: '/materias', label: 'Mis materias', value: subjects.loading ? '…' : subjects.error ? '—' : subjects.total, error: subjects.error, icon: BookOpen, color: 'bg-violet-100 text-violet-600' },
    { href: '/periodos', label: 'Períodos académicos', value: periods.loading ? '…' : periods.error ? '—' : periods.total, error: periods.error, icon: CalendarDays, color: 'bg-cyan-100 text-cyan-600' },
    { href: '/recursos', label: 'Materiales guardados', value: resources.loading ? '…' : resources.error ? '—' : resources.total, error: resources.error, icon: FolderOpen, color: 'bg-amber-100 text-amber-600' },
  ];

  return (
    <AppShell title={`¡Hola, ${user?.fullName?.split(' ')[0] || 'estudiante'}! 👋`} subtitle="Aquí comienza un día más de aprendizaje.">
      <section className="mb-8 rounded-3xl bg-gradient-to-r from-[#6259df] to-[#9183f2] p-7 text-white sm:p-10">
        <span className="text-sm font-semibold text-violet-100">TU ESPACIO ACADÉMICO</span>
        <h2 className="mt-3 max-w-xl text-3xl font-extrabold">Organiza tu semestre y enfócate en lo que importa.</h2>
        <p className="mt-3 text-violet-100">Cada materia que organizas es un paso hacia tus metas.</p>
        <Link href="/materias" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-primary">Ver mis materias <ArrowRight size={17} /></Link>
      </section>

      <div className="grid gap-5 md:grid-cols-3">
        {cards.map(({ href, label, value, error, icon: Icon, color }) => (
          <Link href={href} key={href} className="card group p-6 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg">
            <div className={`mb-5 grid h-12 w-12 place-items-center rounded-xl ${color}`}><Icon /></div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-extrabold" aria-label={`${label}: ${value}`}>{value}</p>
            <p className="mt-3 text-xs font-semibold text-primary group-hover:underline">Ver sección →</p>
            {error && <p className="mt-2 text-xs text-red-600">No se pudieron cargar los datos.</p>}
          </Link>
        ))}
      </div>

      <div className="card mt-8 flex gap-4 p-7">
        <Lightbulb className="shrink-0 text-amber-500" />
        <div><h3 className="font-bold">Un consejo para hoy</h3><p className="mt-2 leading-7 text-slate-500">Agrupa tus materiales por materia. Encontrar lo que necesitas será mucho más sencillo.</p></div>
      </div>
    </AppShell>
  );
}
