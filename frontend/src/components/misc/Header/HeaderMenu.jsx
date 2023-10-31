import { React, useState, useContext } from "react";
import { DrawerContext } from "../../../Contexts/drawerContext";
import { Group, Burger, Container, Button } from "@mantine/core";
import useLinks from "../useLinks";
import { MantineLogo } from "@mantine/ds";
import classes from "./HeaderMenu.module.css";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../../store/Store";
import ChangeMode from "../ColorScheme";

export function HeaderMenu() {
  const { logoutService, user } = useBoundStore((state) => state);
  const { opened, toggle } = useContext(DrawerContext);
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
        <MantineLogo
          size={28}
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        />
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
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
