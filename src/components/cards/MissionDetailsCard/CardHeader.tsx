import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { MissionBannerImage } from "../../images/MissionBannerImage";

interface HeaderProps {
  imageUrl: string;
  altTag: string;
  titleTag: string;
  headline: string;
}

const Container = styled("div")`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  width: 100%;
  isolation: isolate;
`;

const Divider = styled("div")`
  background-color: var(--accent-teal);
  width: 100%;
  height: 6px;
`;

const MissionHeadline = styled("h3")`
  position: absolute;
  bottom: 8px;
  left: 20px;
  padding: 12px 24px;
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--accent-pink);
  background-color: hsla(0, 0%, 0%, 0.4);
  border-radius: 12px 12px 0 0;
  z-index: 1;
`;

export const CardHeader: Component<HeaderProps> = (props) => {
  return (
    <Container>
      <MissionBannerImage
        imageUrl={props.imageUrl}
        altTag={props.altTag}
        titleTag={props.titleTag}
      />
      <Divider />
      <MissionHeadline>{props.headline}</MissionHeadline>
    </Container>
  );
};
