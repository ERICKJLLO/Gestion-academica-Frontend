import {ShieldCheck} from 'lucide-react';
import {AppShell} from '@/src/features/common/components/AppShell';
export default function Admin(){return <AppShell admin title="Administración" subtitle="Acceso exclusivo para administradores."><div className="card p-12 text-center"><ShieldCheck className="mx-auto text-primary" size={48}/><h2 className="mt-5 text-xl font-bold">Panel de administración</h2><p className="mt-3 text-slate-500">Esta ruta comprueba el rol ADMIN. Las operaciones administrativas estarán disponibles cuando el backend implemente sus endpoints protegidos.</p></div></AppShell>}
