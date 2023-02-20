import { createMemo, children } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSXElement, JSX } from "solid-js";

interface ButtonProps {
  isValid: boolean;
  children: JSXElement;
}

const Button = styled("button")`
  padding: 6px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--dark-blue);
  background-color: var(--button-background-color, var(--accent-pink));
  border-radius: 12px;
  border: none;
  outline: none;
  width: 100%;
  height: 50px;
  cursor: var(--button-cursor);
  transition: box-shadow, background-color, 300ms ease-in-out;
  &:focus {
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
  &:hover {
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
`;

export const FormButton: Component<ButtonProps> = (props) => {
  const child = children(() => props.children);

  const styles = createMemo(
    () =>
      ({
        "--button-background-color": props.isValid
          ? "var(--accent-pink)"
          : "var(--base-blue)",
        "--button-cursor": props.isValid ? "pointer" : "not-allowed",
      } as JSX.CSSProperties)
  );

  return (
    <Button type="submit" style={styles()} disabled={!props.isValid}>
      {child()}
    </Button>
  );
};
