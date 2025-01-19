import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoggedHeader } from "../../components/LoggedHeader";
import { ScrollArea, Table } from "@mantine/core";
import classes from "./styles.module.css";
import { fetchClassData } from "../../utils/api";

export function ClassView() {
  const { id } = useParams(); // Get the :id from the URL
  const [classDetails, setClassDetails] = useState(null); // State to store class details
  const [students, setStudents] = useState([]); // State to store student data
  const [scrolled, setScrolled] = useState(false); // State for scroll effect

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchClassData(String(id));
        setClassDetails(result.classDetails);
        setStudents(result.students);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Render table rows dynamically based on student data
  const rows = students.map((row, index) => (
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
      <div style={{ padding: "1rem", maxWidth: 800, margin: "0 auto" }}>
        {/* Class Details Section */}
        {classDetails && (
          <div style={{ marginBottom: "2rem" }}>
            <h2>Class Details</h2>
            <p>
              <strong>Class Name:</strong> {classDetails.name}
            </p>
            <p>
              <strong>Class Section:</strong> {classDetails.section}
            </p>
            <p>
              <strong>Maximum Group Size:</strong> {classDetails.maxGroupSize}
            </p>
            <p>
              <strong>Question List:</strong>
            </p>
            <ul>
              {classDetails.questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Students Table */}
        <ScrollArea
          h={600}
          w="100%"
          style={{ marginTop: "1rem" }}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table miw={700}>
            <Table.Thead
              className={`${classes.header} ${scrolled ? classes.scrolled : ""}`}
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
