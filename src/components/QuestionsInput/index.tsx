import { useForm } from "@mantine/form";
import { TextInput, Group, ActionIcon, Box, Text, Button } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import IconTrash from "../../assets/icons/trash.svg";

interface QuestionProps {
  questionnaire: { question: string; key: string }[];
  onChange: (updatedQuestions: { question: string; key: string }[]) => void;
}

export function QuestionsInput({ questionnaire, onChange }: QuestionProps) {
  const handleAddQuestion = () => {
    const updatedQuestions = [
      ...questionnaire,
      { question: "", key: randomId().replace('mantine-', '') },
    ];
    onChange(updatedQuestions);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questionnaire.filter((_, i) => i !== index);
    onChange(updatedQuestions);
  };

  return (
    <Box maw={500} mx="auto">
      <Text size="xl" fw={700} mb="md" pt="xl">
        Question List
      </Text>
      {questionnaire.length > 0 ? (
        questionnaire.map((item, index) => (
          <Group key={item.key} mt="xs" align="center" direction="row" position="apart" spacing="md">
            <Text size="sm" color="dimmed">
              {index + 1}
            </Text>
            <TextInput
              placeholder="Enter your question"
              withAsterisk
              style={{ flex: 1, maxWidth: "500px" }}
              value={item.question}
              onChange={(e) => {
                const updatedQuestions = [...questionnaire];
                updatedQuestions[index].question = e.target.value;
                onChange(updatedQuestions);
              }}
            />
            <ActionIcon
              color="red"
              onClick={() => handleRemoveQuestion(index)}
            >
              <img
                src={IconTrash}
                alt="trash"
                style={{ width: "16px", height: "16px" }}
              />
            </ActionIcon>
          </Group>
        ))
      ) : (
        <Text c="dimmed" ta="center">
          No questions yet...
        </Text>
      )}
      <Group justify="center" mt="md">
        <Button onClick={handleAddQuestion}>Add Question</Button>
      </Group>
    </Box>
  );
}
