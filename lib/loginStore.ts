import { createSignal } from "solid-js";

import { formValidator } from "../src/utils/validators";
import { emailValidationRules } from "../src/utils/validators/rules";
import type { InputValue, InputOptions } from "../src/types";

export const [emailAddressValue, setEmailAddressValue] =
  createSignal<InputValue>({
    value: "",
    valid: false,
  });

export const [emailAddressOptions, setEmailAddressOptions] =
  createSignal<InputOptions>({
    initial: true,
    touched: false,
  });

export const updateEmailAddressValue = (event: InputEvent) => {
  const inputElement = event.currentTarget as HTMLInputElement;
  const value = inputElement.value;
  const valid = formValidator(value, emailValidationRules);

  setEmailAddressValue(() => ({
    value: value,
    valid: valid,
  }));
};

export const updateEmailAddressOptions = () => {
  setEmailAddressOptions((prevState) => ({
    initial: false,
    touched: !prevState.touched,
  }));
};
