import Link from 'next/link';
import { Atom } from 'lucide-react';
export function Brand() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 font-extrabold tracking-tight text-ink"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white">
        <Atom size={23} />
      </span>
      <span className="text-xl">
        Focus<span className="text-primary">Lab</span>
      </span>
    </Link>
  );
}
