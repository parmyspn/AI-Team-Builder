import cx from 'clsx';
import { Button, Container, Overlay, Text, Title } from '@mantine/core';
import classes from './styles.module.css';

export function HeroHeader() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Automated and fair AI team builder{' '}
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Make the teams in your class more balanced so everyone can learn
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} variant="white" size="lg">
            Student login
          </Button>
          <Button
            className={cx(classes.control, classes.secondaryControl)}
            size="lg"
          >
            Admin login
          </Button>
        </div>
      </div>
    </div>
  );
}
