'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  CalendarDays,
  FileText,
  LayoutDashboard,
  LogOut,
  Shield,
  Menu,
  X,
  GraduationCap,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Brand } from './Brand';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import { RouteGuard } from '@/src/features/auth/components/RouteGuard';
const navigation = [
  { href: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { href: '/periodos', label: 'Períodos', icon: CalendarDays },
  { href: '/materias', label: 'Materias', icon: BookOpen },
  { href: '/recursos', label: 'Biblioteca', icon: FileText },
];
export function AppShell({
  children,
  title,
  subtitle,
  admin = false,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
  admin?: boolean;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const leave = () => {
    logout();
    router.replace('/login');
  };
  return (
    <RouteGuard admin={admin}>
      <div className="min-h-screen lg:flex">
        {open && (
          <button
            aria-label="Cerrar menú"
            className="fixed inset-0 z-30 bg-slate-900/35 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-100 bg-white p-6 transition-transform lg:sticky lg:top-0 lg:h-screen ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          <div className="mb-11 flex items-center justify-between">
            <Brand />
            <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menú">
              <X size={20} />
            </button>
          </div>
          <div className="mb-3 pl-3 text-xs font-bold uppercase tracking-widest text-slate-400">
            Mi espacio
          </div>
          <nav className="space-y-1">
            {navigation.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${path === href ? 'bg-violet-50 text-primary' : 'text-slate-500 hover:bg-slate-50 hover:text-ink'}`}
              >
                <Icon size={19} />
                {label}
              </Link>
            ))}
            {user?.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50"
              >
                <Shield size={19} />
                Administración
              </Link>
            )}
          </nav>
          <div className="mt-auto rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100 p-4">
            <GraduationCap className="mb-2 text-primary" />
            <p className="text-sm font-semibold">Cada avance cuenta.</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Organiza tu semestre, una materia a la vez.
            </p>
          </div>
          <button
            onClick={leave}
            className="mt-5 flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-500 hover:text-red-600"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </aside>
        <main className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-slate-100 bg-white/75 px-5 py-4 backdrop-blur sm:px-10">
            <button onClick={() => setOpen(true)} aria-label="Abrir menú" className="lg:hidden">
              <Menu />
            </button>
            <span className="hidden text-sm font-medium text-slate-400 lg:block">
              Tu espacio para avanzar, a tu ritmo.
            </span>
            <div className="ml-auto flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold">{user?.fullName || 'Estudiante'}</p>
                <p className="text-xs text-slate-400">
                  {user?.role === 'ADMIN' ? 'Administrador' : 'Estudiante'}
                </p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-violet-100 font-bold text-primary">
                {user?.fullName?.[0]?.toUpperCase() || 'F'}
              </span>
            </div>
          </header>
          <div className="mx-auto max-w-6xl px-5 py-9 sm:px-10">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
              <p className="mt-2 text-slate-500">{subtitle}</p>
            </div>
            {children}
          </div>
        </main>
      </div>
    </RouteGuard>
  );
}
