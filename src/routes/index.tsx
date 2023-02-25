import { styled } from "solid-styled-components";
import { Title } from "solid-start";

import { LoginView } from "../views/Login";

const Main = styled("main")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export default function Home() {
  return (
    <Main>
      <Title>Space Mission Solid Start and Cloudflare</Title>
      <LoginView />
    </Main>
  );
}
