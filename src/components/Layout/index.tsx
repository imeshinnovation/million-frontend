import { AppShell } from '@mantine/core';
import { Header } from './Header';
import { Container } from '@mantine/core';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppShell>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Container mt="lg">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};