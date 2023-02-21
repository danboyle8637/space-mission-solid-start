import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSX } from "solid-js";

import { SpaceMissionHelmet } from "../../components/images/SpaceMissionHelmet";
import { TextInput } from "../../components/forms/TextInput";
import {
  emailAddressValue,
  emailAddressOptions,
  updateEmailAddressValue,
  updateEmailAddressOptions,
} from "../../../lib/loginStore";

const Container = styled("div")`
  position: relative;
  isolation: isolate;
`;

const FormContainer = styled("form")`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 40px;
  justify-items: center;
  background-color: #0f0f1a;
  border-radius: 20px;
  width: 375px;
  box-shadow: 0 0 0 6px hsla(0, 0%, 0%, 0.4);
  opacity: 0;
  transform: translateY(-80px) scale(0.9);
  overflow: hidden;
`;

const Logo = styled("div")`
  width: 176px;
`;

const Galaxy = styled("div")`
  position: absolute;
  top: var(--galaxy-top);
  left: var(--galaxy-left);
  right: var(--galaxy-right);
  bottom: var(--galaxy-bottom);
  background-color: var(--galaxy-color);
  width: var(--galaxy-size);
  height: var(--galaxy-size);
  filter: blur(100px);
  z-index: -1;
`;

export const LoginView: Component = () => {
  const galaxy1Styles = createMemo(
    () =>
      ({
        "--galaxy-top": 0,
        "--galaxy-left": 0,
        "--galaxy-right": "unset",
        "--galaxy-bottom": "unset",
        "--galaxy-color": "var(--accent-teal)",
        "--galaxy-size": "160px",
      } as JSX.CSSProperties)
  );

  const galaxy2Styles = createMemo(
    () =>
      ({
        "--galaxy-top": "unset",
        "--galaxy-left": "unset",
        "--galaxy-right": 0,
        "--galaxy-bottom": 0,
        "--galaxy-color": "var(--accent-pink)",
        "--galaxy-size": "120px",
      } as JSX.CSSProperties)
  );

  return (
    <Container>
      <FormContainer>
        <Logo>
          <SpaceMissionHelmet />
        </Logo>
        <TextInput
          inputType="email"
          inputName="emailAddress"
          labelFor="emailAddress"
        />
      </FormContainer>
      <Galaxy style={galaxy1Styles()} />
      <Galaxy style={galaxy2Styles()} />
    </Container>
  );
};