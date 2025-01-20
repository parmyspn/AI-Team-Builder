import { useState } from "react";
import { Card, Group, Image, Text, Rating, Button } from "@mantine/core";
import classes from "./styles.module.css";
import { LoggedHeader } from "../../components/LoggedHeader";

// Dummy data (replace with the API data fetch)
const data = {
  UserID: "e2a0d64a-d8a6-47c9-9f1f-2e0a5c1f5b0b",
  DisplayName: "John Doe",
  Email: "johndoe@example.com",
  Introduction:
    "Hi, I'm John Doe, a software engineer at Tech Corp. I'm passionate about web development and AI.",
  Organization: "UBC",
  UserType: "member",
  Classes: [
    {
      ClassID: "a1b2c3d4-e5f6-4a7b-9a8c-2b3c4d5e6f7g",
      ClassName: "Intro to Web Development",
      Organization: "Tech Academy",
      MaxTeamSize: 5,
      RankingDuration: "30 days",
      RankingStartTime: "2025-01-01T00:00:00Z",
      MatchingStatus: "questions", // Here we specify if it's a questionnaire or ranking
    },
    {
      ClassID: "d4c3b2a1-e6f7-4a8b-9c7d-1e2f3g4h5i6j",
      ClassName: "AI and Machine Learning",
      Organization: "AI Institute",
      MaxTeamSize: 4,
      RankingDuration: "45 days",
      RankingStartTime: "2025-02-01T00:00:00Z",
      MatchingStatus: "ranking", // Ranking system
    },
  ],
};
const questionDD = {
  ClassID: "12345",
  ClassName: "DEMO - CPSC 210 Course Project",
  CoordinatorID: "e2a0d64a-d8a6-47c9-9f1f-2e0a5c1f5b0b",
  MatchingStatus: "awaiting-start",
  MaxTeamSize: 4,
  Organization: "UBC",
  Questions: {
    Coding: "How Comfortable are you with coding in Java?",
    Communication: "How good a communicator are you?",
    Speed: "How fast do you do projects?",
  },
};

// Reusable CardWithStats Component
export function CardWithStats({
  name,
  role,
  stats,
  matchingStatus,
  onClick,
}: any) {
  const items = stats.map((stat: any) => (
    <div key={stat.title}>
      <Text size="xs" color="dimmed">
        {stat.title}
      </Text>
      <Text fw={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));

  return (
    <Card
      withBorder
      padding="lg"
      className={classes.card}
      style={{ cursor: "pointer" }}
      onClick={onClick} // Add onClick handler here
    >
      <Card.Section>
        <Image
          src="./src/assets/images/card.jpg"
          alt={`${name}'s profile`}
          height={200}
        />
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text fz="sm" fw={700} className={classes.title}>
          {name} - {role}
        </Text>
      </Group>

      {/* Display Matching Status instead of Group Statistics */}
      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        Matching Status: {matchingStatus}
      </Text>

      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );
}

// Questionnaire Component for displaying the questions
const Questionnaire = ({ questions }: { questions: any }) => {
 
};

// Components for the ranking system
const RankingSystem = () => (
  <div>
    <h3>Ranking System</h3>
    <form>
      <select>
        <option value="1">Rank 1</option>
        <option value="2">Rank 2</option>
        <option value="3">Rank 3</option>
        <option value="4">Rank 4</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  </div>
);

// Main Component to Render Profiles
export function UserProfile() {
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const handleCardClick = (classInfo: any) => {
    // When a card is clicked, we set the selected class and its details
    setSelectedClass(classInfo);
  };

  const renderContent = () => {
    if (!selectedClass) return null;

    // Check if selectedClass has questions or not
    if (
      selectedClass.MatchingStatus === "questions" &&
      selectedClass.Questions
    ) {
      return <Questionnaire questions={selectedClass.Questions} />;
    } else if (selectedClass.MatchingStatus === "ranking") {
      return <RankingSystem />;
    } else {
      return <div>Status not recognized</div>;
    }
  };

  return (
    <div>
      <LoggedHeader />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {data.Classes.map((classInfo: any) => (
          <CardWithStats
            key={classInfo.ClassID}
            name={classInfo.ClassName}
            role={classInfo.Organization}
            stats={[
              { title: "Max Team Size", value: classInfo.MaxTeamSize },
              { title: "Ranking Duration", value: classInfo.RankingDuration },
            ]}
            matchingStatus={classInfo.MatchingStatus} // Pass the MatchingStatus here
            onClick={() => handleCardClick(classInfo)} // Pass the class data
          />
        ))}
      </div>
      <div style={{ marginTop: "2rem" }}>
        {/* Render the content based on selected class */}
        {renderContent()}
      </div>
    </div>
  );
}
