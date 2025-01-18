import { Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import classes from './styles.module.css';
import FairTeamsLogo from '../logo';

export function PublicHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  return (
    <header className={classes.header}>
      <Container
        size="md"
        className={classes.inner}
        style={{ justifyContent: 'center' }}
      >
        <FairTeamsLogo
          width={200}
          height={46}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
