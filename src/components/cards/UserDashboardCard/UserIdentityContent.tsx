import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSX } from "solid-js";

import { AvatarButton } from "../../buttons/AvatarButton";
import { capitalizeName } from "../../../utils/helpers";
import { user } from "../../../../lib/userStore";

const Container = styled("div")`
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 20px;
  justify-items: start;
  align-items: center;
  width: 100%;
`;

const IdentityContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 4px;
  justify-items: start;
  width: 100%;
`;

const Label = styled("p")`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--label-color, var(--accent-pink));
`;

export const UserIdentityContent: Component = () => {
  const formattedCallSign = createMemo(() =>
    user().callsign.length > 0 ? capitalizeName(user().callsign) : "Rook"
  );

  const dynamicStyles = createMemo(
    () =>
      ({
        "--label-color": "var(--accent-purple)",
      } as JSX.CSSProperties)
  );

  return (
    <Container>
      <AvatarButton />
      <IdentityContainer>
        <Label>Astronaut Call Sign:</Label>
        <Label style={dynamicStyles()}>{formattedCallSign()}</Label>
      </IdentityContainer>
    </Container>
  );
};
