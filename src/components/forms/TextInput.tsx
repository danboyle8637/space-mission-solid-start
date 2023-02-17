import {} from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import {
  emailAddressValue,
  emailAddressOptions,
  updateEmailAddressValue,
  updateEmailAddressOptions,
} from "../../../lib/loginStore";
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
  updateInputValue: UpdateValueFunction
  updateInputOptions: UpdateOptionsFunction
}

const Container = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content;
  gap: 0;
  width: 100%;
  max-width: 500px;
  height: 68px;
  box-shadow: 0 2px 8px 2px hsla(0, 0%, 0%, 0.3);
  overflow: hidden;
`

const InputLabel = styled("label")`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--input-label-color);
  transform: translateX(24px);
`

const InputField = styled("input")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  margin: 0;
  padding: 12px;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--input-text-color);
  background: var(--input-background);
  border: none;
  width: 100%;
  outline: none;
  caret-color: var(--input-caret);
  &::placeholder {
    font-size: 1.6rem;
    color: var(--input-placeholder-color);
  }
`

const UnderlineContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  height: 6px;
`

const BaseUnderline = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background-color: var(--base-underline-color);
  width: 100%;
  height: 100%;
`

const Underline = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background-color: var(--indicator-underline-color);
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  transition: background-color 300ms ease-in-out;
  pointer-events: none;
`

export const TextInput: Component = () => {
  return <input />;
};
