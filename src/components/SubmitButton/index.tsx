import { Button } from "@mantine/core";

export function SubmitButton({ onSubmit }: { onSubmit: () => void }) {
  return (
    <Button variant="filled" color="green" size="md" radius="md" onClick={onSubmit}>
      Submit
    </Button>
  );
}
