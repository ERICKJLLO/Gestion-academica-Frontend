'use client';
import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
export function RouteGuard({children,admin=false,guest=false}:{children:ReactNode;admin?:boolean;guest?:boolean}) {
  const {user,ready}=useAuth(); const router=useRouter();
  const forbidden = ready && (guest ? !!user : (!user || (admin && user.role!=='ADMIN')));
  useEffect(()=>{if(forbidden) router.replace(guest?'/dashboard':(!user?'/login':'/dashboard'));},[forbidden,guest,user,router]);
  if(!ready || forbidden) return <div className="grid min-h-[65vh] place-items-center text-slate-500">Preparando FocusLab…</div>;
  return <>{children}</>;
}
