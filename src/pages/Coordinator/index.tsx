import { useNavigate } from "react-router-dom";
import { LoggedHeader } from "../../components/LoggedHeader";
import { useForm } from "@mantine/form";
import { useState } from "react";
import {
  TextInput,
  Group,
  ActionIcon,
  Box,
  Text,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import IconTrash from "../../assets/icons/trash.svg";
import IconCloudUpload from "../../assets/icons/cloud-upload.svg";
import IconX from "../../assets/icons/x.svg";
import IconDownload from "../../assets/icons/download.svg";

import { Dropzone } from "@mantine/dropzone";
import { useRef } from "react";
import classes from "./styles.module.css";
import { createClass } from "../../utils/api"; // Assuming this function exists in your utils folder.

function Question() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      questionnaire: [{ question: "", key: randomId() }],
    },
  });

  const fields = form.getValues().questionnaire.map((item, index) => (
    <Group
      key={item.key}
      mt="xs"
      align="center"
      direction="row"
      position="apart"
      spacing="md"
    >
      <Text size="sm" color="dimmed" ml="xs">
        {index + 1}
      </Text>
      <TextInput
        placeholder="Enter your question"
        withAsterisk
        style={{ flex: 1, maxWidth: "500px" }}
        key={form.key(`questionnaire.${index}.question`)}
        {...form.getInputProps(`questionnaire.${index}.question`)}
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("questionnaire", index)}
      >
        <img
          src={IconTrash}
          alt="trash"
          style={{ width: "16px", height: "16px" }}
        />
      </ActionIcon>
    </Group>
  ));

  return (
    <Box maw={500} mx="auto">
      <Text size="xl" fw={700} mb="md" pt="xl">
        Question List
      </Text>

      {fields.length > 0 ? (
        <Group mb="xs">
          <Text fw={500} size="sm" style={{ flex: 1 }}>
            Question
          </Text>
        </Group>
      ) : (
        <Text c="dimmed" ta="center">
          No questions yet...
        </Text>
      )}

      {fields}

      <Group justify="center" mt="md">
        <Button
          onClick={() =>
            form.insertListItem("questionnaire", {
              question: "",
              key: randomId(),
            })
          }
        >
          Add Question
        </Button>
      </Group>
    </Box>
  );
}

function ClassDetails() {
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <TextInput label="Class name" placeholder="Class name" mt="md" />
      <TextInput label="Class section" placeholder="Class section" mt="md" />
      <TextInput
        label="Maximum group size"
        placeholder="Maximum group size"
        mt="md"
      />
    </div>
  );
}

export function FileUpload() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<File[]>([]); // Add state to store files

  const handleDrop = (droppedFiles: File[]) => {
    setFiles(droppedFiles); // Store dropped files in the state
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        className={classes.dropzone}
        radius="md"
        maxSize={5 * 1024 ** 2}
        accept={[
          "text/csv",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ]}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group justify="center">
            <Dropzone.Accept>
              <img
                src={IconDownload}
                style={{ width: "50px", height: "50px" }}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <img src={IconX} style={{ width: "50px", height: "50px" }} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <img
                src={IconCloudUpload}
                style={{ width: "50px", height: "50px" }}
              />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>
              List of student file less than 5mb
            </Dropzone.Reject>
            <Dropzone.Idle>Upload list of students</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop files here to upload. We can accept only{" "}
            <i>.csv or excel file</i> files that are less than 5mb in size.
          </Text>
        </div>
      </Dropzone>

      {/* Render the list of dropped files */}
      {files.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Text size="sm" color="dimmed">
            Files:
          </Text>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <Text size="sm">{file.name}</Text>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
      >
        Select files
      </Button>
    </div>
  );
}

function Submit({ onSubmit }: { onSubmit: () => void }) {
  return (
    <Button
      variant="filled"
      color="green"
      size="md"
      radius="md"
      onClick={onSubmit}
    >
      Submit
    </Button>
  );
}

export function Coordinator() {
  // Inside your component, set up the useNavigate hook
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      classDetails: {
        className: "",
        classSection: "",
        maxGroupSize: "",
      },
      questionnaire: [{ question: "", key: randomId() }],
    },
  });

  const handleSubmit = async () => {
    // Prepare form data as a JSON object
    const data = {
      classDetails: form.values.classDetails,
      questionnaire: form.values.questionnaire.map((item) => ({
        question: item.question,
      })),
    };
    const response = await createClass(data); // Assuming this returns the created class data

    // Assuming the class ID is in the response, for example: response.classId
    const classId = response.classId;

    // Use useNavigate to reroute to the class details page
    navigate(`/classview/${classId}`); // Replace `/class/${classId}` with your actual
  };

  return (
    <div>
      <LoggedHeader />
      <Box maw={500} mx="auto" mt="xl">
        <Text size="xl" fw={700} mb="md">
          Class Details
        </Text>
      </Box>
      <ClassDetails />
      <Question />
      <Box maw={500} mx="auto" mt="xl">
        <Text size="xl" fw={700} mb="md">
          Upload Your Class List (Excel, CSV,...)
        </Text>
      </Box>
      <Box
        maw={500}
        mx="auto"
        mt="md"
        p="md"
        style={{
          border: "2px solid #e0e0e0",
          borderRadius: "8px",
          backgroundColor: "#fafafa",
        }}
      >
        <FileUpload />
      </Box>
      <Group justify="center" pt="xl" pb="lg" pl="sm" pr="sm">
        <Submit onSubmit={handleSubmit} />
      </Group>
    </div>
  );
}
