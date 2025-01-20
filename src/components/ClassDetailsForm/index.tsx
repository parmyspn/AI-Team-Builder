import { TextInput, NumberInput } from "@mantine/core";

interface ClassDetailsProps {
  classDetails: {
    ClassName: string;
    ClassSection: string;
    MaxTeamSize: number;
    Organization: string;
    RankingDuration: number;
  };
  onChange: (e: string | number, field: string) => void;
}

export function ClassDetailsForm({ classDetails, onChange }: ClassDetailsProps) {
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <TextInput
        label="Class name"
        placeholder="Class name"
        mt="md"
        value={classDetails.ClassName}
        onChange={(e) => onChange(e.target.value, "ClassName")}
      />
      <TextInput
        label="Class section"
        placeholder="Class section"
        mt="md"
        value={classDetails.ClassSection}
        onChange={(e) => onChange(e.target.value, "ClassSection")}
      />
      <NumberInput
        label="Maximum team size"
        placeholder="Maximum team size"
        mt="md"
        value={classDetails.MaxTeamSize}
        onChange={(value) => onChange(Number(value), "MaxTeamSize")}
      />
      <TextInput
        label="Organization"
        placeholder="Organization"
        mt="md"
        value={classDetails.Organization}
        onChange={(e) => onChange(e.target.value, "Organization")}
      />
      <NumberInput
        label="Ranking duration (minutes)"
        placeholder="Ranking duration"
        mt="md"
        value={classDetails.RankingDuration}
        onChange={(value) => onChange(Number(value), "RankingDuration")}
      />
    </div>
  );
}
