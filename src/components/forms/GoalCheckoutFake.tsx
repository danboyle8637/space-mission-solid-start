import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSX } from "solid-js";

import { Checkbox } from "./inputComponents/Checkbox";

interface ButtonProps {
  name: string;
  label: string;
  isChecked: boolean;
  handleUpdateMissionStats: (name: string, value: boolean) => void;
  isDisabled: boolean;
}

const ButtonContainer = styled("button")`
  padding: 12px;
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 12px;
  justify-items: start;
  align-items: center;
  background: var(--accent-blue);
  border-radius: 12px;
  border: none;
  width: 100%;
  outline: none;
  width: 100%;
  cursor: var(--button-cursor);
  transition: box-shadow, 300ms ease-in-out;
  &:focus {
    box-shadow: 0 4px 2px 0px hsla(0, 0%, 0%, 0.4), 0 0 0 2px var(--dark-4),
      0 0 0 5px var(--accent-teal);
  }
  &:hover {
    box-shadow: 0 4px 2px 0px hsla(0, 0%, 0%, 0.4), 0 0 0 2px var(--dark-4),
      0 0 0 5px var(--accent-teal);
  }
`;

const Label = styled("p")`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--base-blue);
  font-weight: 700;
  width: 100%;
`;

export const GoalCheckboxFake: Component<ButtonProps> = (props) => {
  const styles = createMemo(
    () =>
      ({
        "--button-background":
          props.name === "deleteSavedWorkout" && !props.isDisabled
            ? "var(--additional-pink-1)"
            : props.name === "unBookmarkSavedWorkout" && props.isDisabled
            ? "var(--dark-7)"
            : "var(--additional-purple-2)",
        "--button-cursor": props.isDisabled ? "not-allowed" : "pointer",
      } as JSX.CSSProperties)
  );

  return (
    <ButtonContainer
      style={styles()}
      type="button"
      onClick={() =>
        props.handleUpdateMissionStats(props.name, !props.isChecked)
      }
    >
      <Checkbox makeSmall={true} isComplete={props.isChecked} />
      <Label>{props.label}</Label>
    </ButtonContainer>
  );
};
