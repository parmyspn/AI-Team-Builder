import { LoggedHeader } from "../../components/LoggedHeader";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Group,
  ActionIcon,
  Box,
  Text,
  useMantineTheme,
  Button,
  Fieldset,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useRef } from "react";
import { IconCloudUpload, IconDownload } from "@tabler/icons-react";
import classes from "./styles.module.css";

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
        key={form.key(`questionnaire.${index}.question`)} // Fix: backticks here
        {...form.getInputProps(`questionnaire.${index}.question`)} // Fix: backticks here
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("questionnaire", index)}
      >
        <IconTrash size={16} />
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

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={() => {}}
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
              <IconDownload
                size={50}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload size={50} stroke={1.5} />
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

function Submit() {
  return (
    <Button variant="filled" color="green" size="md" radius="md">
      Submit
    </Button>
  );
}

export function Coordinator() {
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
        <Submit />
      </Group>
    </div>
  );
}
