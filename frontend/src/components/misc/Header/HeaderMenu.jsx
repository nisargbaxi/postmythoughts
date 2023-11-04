import { React, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Group,
  Burger,
  Container,
  Button,
  Drawer,
  ScrollArea,
  Divider,
} from "@mantine/core";
import useLinks from "../useLinks";
import { MantineLogo } from "@mantine/ds";
import classes from "./HeaderMenu.module.css";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../../store/Store";
import ChangeMode from "../ColorScheme";
import { AppLogo } from "./AppLogo";

export function HeaderMenu() {
  const { logoutService, user } = useBoundStore((state) => state);
  const [opened, { close: closeDrawer, toggle: toggleDrawer }] =
    useDisclosure(false);
  const links = useLinks();
  const navigate = useNavigate();
  const [active, setActive] = useState(links[0].link);
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        if (opened) toggleDrawer();
        setActive(link.link);
        navigate(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <AppLogo size={70} />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Group visibleFrom="sm">
          {!user && (
            <>
              <Button
                variant="default"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </Button>
              <Button
                onClick={() => {
                  navigate("/Register");
                }}
              >
                Sign up
              </Button>
            </>
          )}
          {user && (
            <>
              <Button
                variant="gradient"
                onClick={() => {
                  logoutService();
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Group>
        <Group visibleFrom="sm">
          <ChangeMode />
        </Group>
        <Burger
          opened={opened}
          onClick={toggleDrawer}
          hiddenFrom="xs"
          size="sm"
        />

        <Drawer
          withCloseButton={true}
          opened={opened}
          title="Welcome to Post your Thoughts!"
          size="100%"
          onClose={closeDrawer}
        >
          <ScrollArea h={`calc(100vh - rem(80))`} mx="-md">
            <Divider my="sm" />
            <Group>
              <p style={{ paddingLeft: 10 }}>Change Theme: </p>
              <ChangeMode />
            </Group>
            <Divider my="sm" />
            <div className={classes.drawerLink}>{items}</div>
            <Divider my="sm" />
            <Group justify="center" grow pb="xl" px="md">
              {!user && (
                <>
                  <Button
                    variant="default"
                    onClick={() => {
                      if (opened) toggleDrawer();
                      navigate("/login");
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    onClick={() => {
                      if (opened) toggleDrawer();
                      navigate("/Register");
                    }}
                  >
                    Sign up
                  </Button>
                </>
              )}
              {user && (
                <>
                  <Button
                    variant="gradient"
                    onClick={() => {
                      logoutService();
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Group>
          </ScrollArea>
        </Drawer>
      </Container>
    </header>
  );
}
