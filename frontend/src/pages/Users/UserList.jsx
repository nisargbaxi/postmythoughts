import cx from "clsx";
import { useEffect, useState } from "react";
import DOMAIN from "../../services/endpoint";
import { Table, ScrollArea, Container, Center } from "@mantine/core";
import axios from "axios";
import classes from "./UserList.module.css";
import { Hourglass } from "react-loader-spinner";

export function UserList() {
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${DOMAIN}/api/allusers`)
      .then((response) => {
        setTimeout(() => {
          setData(response.data);
          setLoading(false);
        }, 100);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const rows = data.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.email}</Table.Td>
      <Table.Td>{item.password}</Table.Td>
      <Table.Td>{item.about}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container>
      {loading && (
        <Center>
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        </Center>
      )}
      {!loading && (
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
      )}
    </Container>
  );
}
