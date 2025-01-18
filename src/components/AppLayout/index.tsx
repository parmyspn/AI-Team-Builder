import { AppShell } from '@mantine/core';
import { Footer } from '../../components/Footer';
import { PublicHeader } from '../../components/PublicHeader';

interface AppShellLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppShellLayoutProps) {
  return (
    <AppShell header={{ height: 56 }} footer={{ height: 280 }}>
      <AppShell.Header>
        <PublicHeader />
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
