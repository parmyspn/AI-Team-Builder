import InstagramIcon from '../../assets/icons/brand-instagram.svg';
import XIcon from '../../assets/icons/brand-x.svg';
import YouTubeIcon from '../../assets/icons/brand-youtube.svg';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './styles.module.css';

const data = [
  {
    title: 'About',
    links: [
      { label: 'Features', link: '#' },
      { label: 'Pricing', link: '#' },
      { label: 'Support', link: '#' },
      { label: 'Forums', link: '#' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Contribute', link: '#' },
      { label: 'Media assets', link: '#' },
      { label: 'Changelog', link: '#' },
      { label: 'Releases', link: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Join Discord', link: '#' },
      { label: 'Follow on Twitter', link: '#' },
      { label: 'Email newsletter', link: '#' },
      { label: 'GitHub discussions', link: '#' },
    ],
  },
];

export function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <MantineLogo size={30} />
          <Text size="xs" c="dimmed" className={classes.description}>
            Build fully functional accessible web applications faster than ever
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2025 mantine.dev. All rights reserved.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <img
              src={InstagramIcon}
              alt="Instagram"
              style={{ width: '18px', height: '18px' }}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <img
              src={YouTubeIcon}
              alt="Instagram"
              style={{ width: '18px', height: '18px' }}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <img
              src={XIcon}
              alt="Instagram"
              style={{ width: '18px', height: '18px' }}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
