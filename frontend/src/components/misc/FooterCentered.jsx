import { Anchor, Group, ActionIcon, rem } from "@mantine/core";
import classes from "./FooterCentered.module.css";
import { AppLogo } from "./Header/AppLogo";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
];

export default function FooterCentered() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <AppLogo size={40} />
        <Group gap="xs" justify="center" wrap="nowrap">
          &copy; 2023 Nisarg Baxi, BCIT
        </Group>
      </div>
    </div>
  );
}
