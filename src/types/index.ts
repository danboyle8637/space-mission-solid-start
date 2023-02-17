export interface InputValue {
  value: string;
  valid: boolean;
}

export type InputOptions = {
  initial: boolean;
  touched: boolean;
};

export type UpdateValueFunction = (event: InputEvent) => void;

export type UpdateOptionsFunction = (event: FocusEvent) => void;

export type UpdateValueFunctionWithKeyboard = (
  event: KeyboardEvent,
  value: number,
  name: string
) => void;
