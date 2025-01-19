import { LoggedHeader } from "../../components/LoggedHeader";
import { useEffect, useState } from "react";
import { ScrollArea, Table } from "@mantine/core";
import Papa from "papaparse";
import cx from "clsx";
import classes from "./styles.module.css";

export function ClassView() {

  const rows = data.map((row, index) => (
    <Table.Tr key={row.studentID}>
      <Table.Td>{index + 1}</Table.Td> {/* Counter */}
      <Table.Td>{row.studentID}</Table.Td>
      <Table.Td>{row.first_name}</Table.Td>
      <Table.Td>{row.last_name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <LoggedHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <ScrollArea
          h={600}
          w="100%"
          style={{ maxWidth: 800, marginTop: "1rem" }}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table miw={700}>
            <Table.Thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <Table.Tr>
                <Table.Th>#</Table.Th>
                <Table.Th>Student ID</Table.Th>
                <Table.Th>First Name</Table.Th>
                <Table.Th>Last Name</Table.Th>
                <Table.Th>Email</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
