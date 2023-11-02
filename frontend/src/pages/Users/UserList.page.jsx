import React, { useState } from "react";
import cx from "clsx";
import DOMAIN from "../../services/endpoint";
import { Table, ScrollArea, Container, Center } from "@mantine/core";
import axios from "axios";
import classes from "./UserList.module.css";
import { defer, useAsyncValue, useLoaderData } from "react-router-dom";
import PageContent from "../../components/misc/PageContent";

export const UserList = () => {
  const data = useLoaderData();
  return (
    <PageContent promise={data.users}>
      <UserGrid />
    </PageContent>
  );
};

function UserGrid() {
  const [scrolled, setScrolled] = useState(false);
  const { data } = useAsyncValue();
  return (
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
        <Table.Tbody>
          {data.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>{item.name}</Table.Td>
              <Table.Td>{item.email}</Table.Td>
              <Table.Td>{item.password}</Table.Td>
              <Table.Td>{item.about}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

export const userPageLoader = async () => {
  const promise = axios.get(`${DOMAIN}/api/allusers`);
  return defer({
    users: promise,
  });
};
