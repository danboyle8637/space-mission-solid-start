import type { Rules } from "./index";

export const firstNameValidationRules: Rules = {
  minLength: 1,
  isRequired: true,
};

export const emailValidationRules: Rules = {
  minLength: 4,
  isEmail: true,
  isRequired: true,
};

export const contactMessageValidationRules: Rules = {
  maxLength: 400,
  isRequired: true,
};

export const cellValidationRules: Rules = {
  minLength: 10,
  maxLength: 20,
  isRequired: true,
};

export const usernameValidationRules: Rules = {
  minLength: 2,
  maxLength: 10,
  isRequired: true,
};
