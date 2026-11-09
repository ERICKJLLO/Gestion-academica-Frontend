import Link from 'next/link';
import { Brand } from '@/src/features/common/components/Brand';
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
      <Brand />
      <p className="mt-12 text-7xl font-extrabold text-primary">404</p>
      <h1 className="mt-5 text-3xl font-extrabold">Esta página no existe</h1>
      <p className="mt-3 text-slate-500">
        Parece que tomaste un camino diferente. Regresemos al inicio.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Volver al inicio
      </Link>
    </div>
  );
}
