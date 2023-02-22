import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { GoalIndicator } from "../../cssDrawings/GoalIndicator";
import { CircleGraph } from "../../svgs/CircleGraph";
import { missionStats } from "../../../../lib/missionStore";

const Container = styled("div")`
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 20px;
  justify-items: start;
  align-items: center;
  width: 100%;
`;

const StatsContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 8px;
  justify-items: start;
  width: 100%;
`;

const Label = styled("p")`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--accent-pink);
`;

const DotsContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: fit-content;
`;

const StatusGraph = styled("div")`
  width: 60px;
`;

export const UserMissionStatsContent: Component = () => {
  const percentComplete = createMemo(() => {
    if (
      missionStats().isGoal1Complete &&
      !missionStats().isGoal2Complete &&
      !missionStats().isGoal3Complete
    ) {
      return 3;
    }

    if (
      missionStats().isGoal1Complete &&
      missionStats().isGoal2Complete &&
      !missionStats().isGoal3Complete
    ) {
      return 6;
    }

    if (
      missionStats().isGoal1Complete &&
      missionStats().isGoal2Complete &&
      missionStats().isGoal3Complete
    ) {
      return 10;
    }

    return 0;
  });

  return (
    <Container>
      <StatsContainer>
        <Label>Mission Status:</Label>
        <DotsContainer>
          <GoalIndicator isComplete={missionStats().isGoal1Complete} />
          <GoalIndicator isComplete={missionStats().isGoal2Complete} />
          <GoalIndicator isComplete={missionStats().isGoal3Complete} />
        </DotsContainer>
      </StatsContainer>
      <StatusGraph>
        <CircleGraph value={percentComplete()} runAction={true} />
      </StatusGraph>
    </Container>
  );
};
