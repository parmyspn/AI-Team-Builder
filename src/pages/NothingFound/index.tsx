import { AppLayout } from '../../components/AppLayout';
import { Button, Group, Text, Title } from '@mantine/core';
import { Illustration } from './illustration';
import classes from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export function NothingFoundBackground() {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group justify="center">
            <Button size="md" onClick={() => navigate('/')}>
              Take me back to home page
            </Button>
          </Group>
        </div>
      </div>
    </AppLayout>
  );
}
