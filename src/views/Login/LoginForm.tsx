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
  resetLoginForm,
} from "../../../lib/loginStore";

// TODO - DELETE THIS IN PRODUCTION
import { updateUser } from "../../../lib/userStore";
import type { UserDoc } from "../../types/index";

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
    const email = formData.get("emailAddress");

    if (email) {
      const user: UserDoc = {
        userId: "123456",
        activeMission: "",
        callsign: "Maverick",
        avatar: "",
        emailAddress: email as string,
        finishedMissions: [],
      };

      updateUser(user);
    }

    if (email === "dan@dan.com") {
      return redirect("/dashboard");
    } else {
      resetLoginForm();
    }
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
