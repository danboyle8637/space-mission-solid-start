import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSX } from "solid-js";

import { DummyButton } from "../../buttons/DummyButton";
import { GoalIndicator } from "../../cssDrawings/GoalIndicator";
import { missionStats } from "../../../../lib/missionStore";

interface FooterProps {
  isActive: boolean;
  isHovering: boolean;
  isMissionComplete: boolean;
}

const Container = styled("div")`
  padding: 0 12px 12px 12px;
  display: grid;
  grid-template-columns: 1fr min-content;
  justify-items: center;
  align-items: center;
  width: 100%;
  pointer-events: none;
`;

const DotsContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: fit-content;
`;

const ButtonContainer = styled("div")`
  width: 175px;
`;

export const Footer: Component<FooterProps> = (props) => {
  const styles = createMemo(
    () =>
      ({
        "--button-background-color": props.isActive
          ? "var(--accent-pink)"
          : props.isMissionComplete
          ? "var(--accent-purple)"
          : "var(--accent-teal)",
      } as JSX.CSSProperties)
  );

  return (
    <Container>
      <DotsContainer>
        <GoalIndicator
          isComplete={missionStats().isGoal1Complete && props.isActive}
        />
        <GoalIndicator
          isComplete={missionStats().isGoal2Complete && props.isActive}
        />
        <GoalIndicator
          isComplete={missionStats().isGoal3Complete && props.isActive}
        />
      </DotsContainer>
      <ButtonContainer style={styles()}>
        <DummyButton isHovering={props.isHovering}>
          {props.isActive
            ? "Update Mission"
            : props.isMissionComplete
            ? "Completed"
            : "Start Mission"}
        </DummyButton>
      </ButtonContainer>
    </Container>
  );
};
