import { createSignal, onMount, createMemo, createEffect } from "solid-js";
import { useNavigate } from '@solidjs/router'
import { styled } from "solid-styled-components";
import type { Component, JSX } from "solid-js";

import { SpaceMissionLogo } from "../../components/images/SpaceMissionLogo";
import { LoginForm } from "./LoginForm";
import { loginFormOnLoad } from "../../animations";

import { ActionButton } from '../../components/buttons/ActionButton'

const Container = styled("div")`
  position: relative;
  isolation: isolate;
`;

const FormContainer = styled("div")`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 40px;
  justify-items: center;
  background-color: #0f0f1a;
  border-radius: 20px;
  width: 100%;
  max-width: 375px;
  box-shadow: 0 0 0 6px hsla(0, 0%, 0%, 0.4);
  overflow: hidden;
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
  const [showLoginForm, setShowLoginForm] = createSignal<boolean>(false);

  const toggleShowLoginForm = () => {
    setShowLoginForm((prevValue) => !prevValue);
  };

  let loginFormRef: HTMLDivElement;

  onMount(() => {
    toggleShowLoginForm();
  });

  createEffect(() => {
    if (showLoginForm()) {
      loginFormOnLoad(loginFormRef);
    }
  });

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

  const navigate = useNavigate()

  const handleDashboardClick = () => {
    navigate("/dashboard")
  }

  return (
    <Container>
      <FormContainer ref={loginFormRef!}>
        <SpaceMissionLogo />
        <LoginForm />
        <ActionButton isDisabled={false} handleClick={handleDashboardClick}>Go To Dashboard</ActionButton>
      </FormContainer>
      <Galaxy style={galaxy1Styles()} />
      <Galaxy style={galaxy2Styles()} />
    </Container>
  );
};
