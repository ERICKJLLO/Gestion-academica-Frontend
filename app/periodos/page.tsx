import { AppShell } from '@/src/features/common/components/AppShell';
import { PeriodsPanel } from '@/src/features/academic-periods/components/PeriodsPanel';

export default function PeriodosPage() {
  return (
    <AppShell
      title="Períodos académicos"
      subtitle="Organiza tus semestres y mantén tu historial académico."
    >
      <PeriodsPanel />
    </AppShell>
  );
}
