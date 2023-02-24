import { createMemo, children } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSX, JSXElement } from "solid-js";

interface ButtonProps {
  handleClick: () => void;
  isDisabled: boolean;
  children: JSXElement;
}

const Button = styled("button")`
  padding: 6px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--button-label-color);
  background-color: var(--button-background-color, var(--accent-pink));
  border-radius: 0;
  border: none;
  outline: none;
  width: 100%;
  height: 60px;
  box-shadow: var(--button-box-shadow);
  cursor: var(--button-cursor);
  transition: box-shadow, background-color, 300ms ease-in-out;
  &:focus {
    background-color: var(--accent-teal);
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
  &:hover {
    background-color: var(--accent-teal);
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
`;

export const ActionButton: Component<ButtonProps> = (props) => {
  const child = children(() => props.children);

  const styles = createMemo(
    () =>
      ({
        "--button-label-color": props.isDisabled
          ? "#2C2C4E"
          : "var(--dark-blue)",
        "--button-background-color": props.isDisabled
          ? "var(--base-blue)"
          : "var(--accent-pink)",
        "--button-cursor": props.isDisabled ? "not-allowed" : "pointer",
      } as JSX.CSSProperties)
  );

  return (
    <Button
      style={styles()}
      type="button"
      onClick={props.handleClick}
      disabled={props.isDisabled}
    >
      {child()}
    </Button>
  );
};
