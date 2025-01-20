import { Dropzone } from "@mantine/dropzone";
import { Button, Text, Group } from "@mantine/core";
import { useRef, useState } from "react";
import IconDownload from "../../assets/icons/download.svg";
import IconX from "../../assets/icons/x.svg";
import IconCloudUpload from "../../assets/icons/cloud-upload.svg";
import classes from "./styles.module.css";

interface FileUploadProps {
  files: File[];
  onFileChange: (newFiles: File[]) => void;
}

export function FileUpload({ files, onFileChange }: FileUploadProps) {
  const openRef = useRef<() => void>(null);

  const handleDrop = (droppedFiles: File[]) => {
    onFileChange(droppedFiles);
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        className={classes.dropzone}
        radius="md"
        maxSize={5 * 1024 ** 2}
        accept={["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group justify="center">
            <Dropzone.Accept>
              <img src={IconDownload} style={{ width: "50px", height: "50px" }} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <img src={IconX} style={{ width: "50px", height: "50px" }} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <img src={IconCloudUpload} style={{ width: "50px", height: "50px" }} />
            </Dropzone.Idle>
          </Group>
          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>List of student file less than 5mb</Dropzone.Reject>
            <Dropzone.Idle>Upload list of students</Dropzone.Idle>
          </Text>
        </div>
      </Dropzone>

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

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button>
    </div>
  );
}
