import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  FolderOpen,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Brand } from '@/src/features/common/components/Brand';
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <header className="flex h-24 items-center justify-between">
          <Brand />
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 font-semibold text-slate-600 hover:text-primary"
            >
              Iniciar sesión
            </Link>
            <Link href="/register" className="btn-primary hidden sm:inline-flex">
              Crear cuenta <ArrowRight size={17} />
            </Link>
          </div>
        </header>
        <main className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-28">
          <section>
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles size={16} /> Tu vida académica, en orden
            </span>
            <h1 className="mt-7 text-5xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-6xl">
              Enfócate en aprender.{' '}
              <span className="text-primary">Nosotros te ayudamos a organizarte.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-slate-500">
              Materias, semestres y recursos de estudio en un solo lugar. Menos tiempo buscando, más
              tiempo avanzando.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/register" className="btn-primary">
                Comenzar gratis <ArrowRight size={18} />
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-slate-200 px-5 py-3 font-semibold hover:bg-slate-50"
              >
                Ya tengo una cuenta
              </Link>
            </div>
            <p className="mt-7 flex items-center gap-2 text-sm text-slate-500">
              <CheckCircle2 className="text-emerald-500" size={18} /> Diseñado para estudiantes como
              tú
            </p>
          </section>
          <div className="relative rounded-[2rem] bg-gradient-to-br from-[#e7e9ff] via-[#f1edff] to-[#ddecff] p-6 sm:p-10">
            <div className="card relative mx-auto max-w-md overflow-hidden p-6">
              <div className="mb-7 flex items-center justify-between">
                <span className="font-bold">Mi semestre</span>
                <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  En progreso
                </span>
              </div>
              <p className="text-sm text-slate-500">Tu espacio académico</p>
              <h3 className="mb-7 mt-1 text-2xl font-extrabold">¡Todo bajo control! ✨</h3>
              {[
                ['Diseño de software', 'bg-indigo-500', 'w-4/5'],
                ['Bases de datos', 'bg-cyan-500', 'w-3/5'],
                ['Desarrollo web', 'bg-purple-500', 'w-2/3'],
              ].map(([name, color, width]) => (
                <div className="mb-6" key={name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold">{name}</span>
                    <span className="text-slate-400">Organizada</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className={`h-2 rounded-full ${color} ${width}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-5 -left-4 rounded-2xl bg-white p-4 shadow-xl sm:-left-10">
              <span className="text-sm font-bold text-primary">✦ Un lugar para tus metas</span>
            </div>
          </div>
        </main>
        <section className="grid gap-5 border-t border-slate-100 py-16 md:grid-cols-3">
          {[
            {
              icon: CalendarDays,
              title: 'Organiza tus períodos',
              desc: 'Ten claros tus semestres y las materias de cada uno.',
            },
            {
              icon: BookOpen,
              title: 'Gestiona tus materias',
              desc: 'Consulta y administra tus materias desde un mismo panel.',
            },
            {
              icon: FolderOpen,
              title: 'Guarda tus materiales',
              desc: 'Mantén tus documentos y apuntes al alcance.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div className="rounded-2xl bg-mist p-7" key={title}>
              <Icon className="text-primary" size={30} />
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 leading-7 text-slate-500">{desc}</p>
            </div>
          ))}
        </section>
        <footer className="border-t py-8 text-center text-sm text-slate-400">
          FocusLab · Tu espacio académico
        </footer>
      </div>
    </div>
  );
}
