import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { SpaceMissionLogo } from "../../components/images/SpaceMissionLogo";

const Container = styled("header")`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Header: Component = () => {
  return (
    <Container>
      <SpaceMissionLogo />
    </Container>
  );
};
