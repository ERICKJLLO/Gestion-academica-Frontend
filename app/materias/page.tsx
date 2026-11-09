import { AppShell } from '@/src/features/common/components/AppShell';
import { SubjectsPanel } from '@/src/features/subjects/components/SubjectsPanel';
export default function Materias() {
  return (
    <AppShell title="Mis materias" subtitle="Organiza y consulta las materias de tu semestre.">
      <SubjectsPanel />
    </AppShell>
  );
}
