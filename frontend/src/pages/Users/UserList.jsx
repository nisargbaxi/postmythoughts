import cx from "clsx";
import { useState } from "react";
import DOMAIN from "../../services/endpoint";
import { Table, ScrollArea, Container } from "@mantine/core";
import axios from "axios";
import classes from "./UserList.module.css";
import { useLoaderData } from "react-router-dom";

export function UserList() {
  const [scrolled, setScrolled] = useState(false);
  const users = useLoaderData();
  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.password}</Table.Td>
      <Table.Td>{user.about}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container>
      <ScrollArea
        h={300}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table miw={700}>
          <Table.Thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Password</Table.Th>
              <Table.Th>About</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
}

export const userListLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/allusers`);
  return res.data;
};
