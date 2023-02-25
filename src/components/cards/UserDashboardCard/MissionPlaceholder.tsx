import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { MissionPlaceholderIcon } from "../../svgs/MissionPlaceholderIcon";

const Container = styled.div`
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--base-blue);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 0 0 4px hsla(0, 0%, 0%, 0.4);
  overflow: hidden;
`;

const Icon = styled("div")`
  width: 14px;
`;

export const MissionPlaceholder: Component = () => {
  return (
    <Container>
      <Icon>
        <MissionPlaceholderIcon />
      </Icon>
    </Container>
  );
};
