import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AllRoutes from './routes';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <Notifications />
      <AllRoutes />
    </MantineProvider>
  );
}
