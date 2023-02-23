import { styled } from "solid-styled-components";
import { createRouteAction, redirect } from "solid-start";
import type { Component } from "solid-js";

import { TextInput } from "../../components/forms/TextInput";
import { FormButton } from "../../components/buttons/FormButton";
import {
  emailAddress,
  emailAddressOptions,
  updateEmailAddressValue,
  updateEmailAddressOptions,
} from "../../../lib/loginStore";

const FormContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 24px;
  justify-items: center;
  width: 320px;
`;

const ButtonContainer = styled("div")`
  width: 175px;
`;

export const LoginForm: Component = () => {
  const [_, { Form }] = createRouteAction(async (formData: FormData) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    const email = formData.get("emailAddress");
    console.log(email);
    if (email === "dan@dan.com") {
      return redirect("/admin");
    } else {
      throw new Error("Invalid username");
    }
    return redirect("/home");
  });

  return (
    <Form>
      <FormContainer>
        <TextInput
          inputType="email"
          inputName="emailAddress"
          labelFor="emailAddress"
          labelName="Email Address"
          labelInstructions=""
          labelError=""
          placeholder="Enter your email address..."
          value={emailAddress().value}
          valid={emailAddress().valid}
          initial={emailAddressOptions().initial}
          touched={emailAddressOptions().touched}
          updateInputValue={updateEmailAddressValue}
          updateInputOptions={updateEmailAddressOptions}
        />
        <ButtonContainer>
          <FormButton isValid={emailAddress().valid}>Login</FormButton>
        </ButtonContainer>
      </FormContainer>
    </Form>
  );
};
