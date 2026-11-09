import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/src/features/auth/hooks/useAuth';
export const metadata: Metadata = {
  title: 'FocusLab | Tu espacio académico',
  description: 'Organiza tus materias, períodos y materiales de estudio en un solo lugar.',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
