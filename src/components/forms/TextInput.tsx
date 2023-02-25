import { createEffect, createMemo } from "solid-js";
import { styled, useTheme } from "solid-styled-components";
import type { Component, JSX } from "solid-js";

import { textInputActive } from "../../animations";
import type { UpdateValueFunction, UpdateOptionsFunction } from "../../types";

interface InputProps {
  inputType: string;
  inputName: string;
  labelName: string;
  labelFor: string;
  labelError?: string;
  labelInstructions?: string;
  placeholder: string;
  value: string;
  valid: boolean;
  initial: boolean;
  touched: boolean;
  updateInputValue: UpdateValueFunction;
  updateInputOptions: UpdateOptionsFunction;
}

const InputContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content;
  gap: 0;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  height: 68px;
  box-shadow: 0 2px 8px 2px hsla(0, 0%, 0%, 0.3);
  overflow: hidden;
`;

const InputField = styled("input")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  margin: 0;
  padding: 12px;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--accent-purple);
  background: #313056;
  border: none;
  width: 100%;
  outline: none;
  caret-color: var(--accent-teal);
  &::placeholder {
    font-size: 1.6rem;
    color: var(--accent-purple);
  }
`;

const UnderlineContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  height: 6px;
`;

const BaseUnderline = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background-color: #14141f;
  width: 100%;
  height: 100%;
`;

const Underline = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background-color: var(--underline-color);
  width: 100%;
  height: 100%;
  transition: background-color 300ms ease-in-out;
  pointer-events: none;
`;

// TODO - Build out this input for component library
export const TextInput: Component<InputProps> = (props) => {
  let underlineRef: HTMLDivElement;

  createEffect(() => {
    if (props.touched) {
      textInputActive(underlineRef);
    }
  });

  const styles = createMemo(
    () =>
      ({
        "--underline-color": props.touched
          ? "var(--accent-pink)"
          : !props.valid && !props.touched && !props.initial
          ? "#E03030"
          : props.valid && !props.touched
          ? "var(--accent-teal)"
          : "#14141F",
      } as JSX.CSSProperties)
  );

  return (
    <InputContainer style={styles()}>
      <InputField
        type={props.inputType}
        id={props.inputName}
        auto-complete="off"
        name={props.inputName}
        placeholder={props.placeholder}
        value={props.value}
        onInput={props.updateInputValue}
        onFocus={props.updateInputOptions}
        onBlur={props.updateInputOptions}
      />
      <UnderlineContainer>
        <BaseUnderline />
        <Underline ref={underlineRef!} />
      </UnderlineContainer>
    </InputContainer>
  );
};
