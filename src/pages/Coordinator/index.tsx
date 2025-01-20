import { useNavigate } from "react-router-dom";
import { LoggedHeader } from "../../components/LoggedHeader";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { randomId } from "@mantine/hooks";
import { Box, Group, Text } from "@mantine/core";
import { createClass } from "../../utils/api"; // Assuming this function exists in your utils folder.
import { COORDINATOR_USER_ID } from "../../utils/dummydata";

// Import refactored components
import { ClassDetailsForm } from "../../components/ClassDetailsForm";
import { QuestionsInput } from "../../components/QuestionsInput";
import { FileUpload } from "../../components/FileUpload";
import { SubmitButton } from "../../components/SubmitButton";  // Assuming Submit component is now a separate file



export function Coordinator() {
  const navigate = useNavigate();
  
  const [files, setFiles] = useState<File[]>([]);
  const [classDetails, setClassDetails] = useState({
    ClassName: "",
    ClassSection: "",
    CoordinatorID: COORDINATOR_USER_ID,
    MaxTeamSize: 4,
    Organization: "UBC",
    RankingDuration: 60,
    RankingStartTime: Math.floor(new Date('2025-09-06T00:00:00Z').getTime() / 1000)
    ,
  });
  const [questionnaire, setQuestionnaire] = useState<any[]>([]);

  const handleClassDetailsChange = (value: string | number, field: string) => {
    setClassDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuestionnaireChange = (updatedQuestions: { question: string; key: string }[]) => {
    setQuestionnaire(updatedQuestions);
  };

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleSubmit = async () => {
    const data = {
      ...classDetails,
      Questions: questionnaire.reduce((acc, item) => {
        acc[item.key] = item.question;
        return acc;
      }, {}),
    };
    try {
      const response = await createClass(data);
      console.log(response)
      navigate(`/classview/${response.ClassID}`);
    } catch (e) {
      console.error(e);
    }

  };

  return (
    <div>
      <LoggedHeader />
      <Box maw={500} mx="auto" mt="xl">
        <Text size="xl" fw={700} mb="md">
          Class Details
        </Text>
      </Box>
      <ClassDetailsForm
        classDetails={classDetails}
        onChange={handleClassDetailsChange}
      />
      <QuestionsInput
        questionnaire={questionnaire}
        onChange={handleQuestionnaireChange}
      />
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
        <FileUpload files={files} onFileChange={handleFileChange} />
      </Box>
      <Group justify="center" pt="xl" pb="lg" pl="sm" pr="sm">
        <SubmitButton onSubmit={handleSubmit} />
      </Group>
    </div>
  );
}
