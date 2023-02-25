import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { MissionBannerImage } from "../../images/MissionBannerImage";

interface BannerImageProps {
  imageUrl: string;
  altTag: string;
  titleTag: string;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  pointer-events: none;

  & img {
    width: 100%;
    height: auto;
  }
`;

const Divider = styled.div`
  background-color: var(--accent-teal);
  width: 100%;
  height: 6px;
`;

export const MissionBanner: Component<BannerImageProps> = (props) => {
  return (
    <Container>
      <MissionBannerImage
        imageUrl={props.imageUrl}
        altTag={props.altTag}
        titleTag={props.titleTag}
      />
      <Divider />
    </Container>
  );
};
