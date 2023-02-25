import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSX } from "solid-js";

interface DotProps {
  isComplete: boolean;
}

const GoalDot = styled("div")`
  background-color: var(--dot-background-color);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  box-shadow: 0 0 0 2px var(--accent-blue);
`;

export const GoalIndicator: Component<DotProps> = (props) => {
  const styles = createMemo(
    () =>
      ({
        "--dot-background-color": props.isComplete
          ? "var(--accent-blue)"
          : "none",
      } as JSX.CSSProperties)
  );

  return <GoalDot style={styles()} />;
};
