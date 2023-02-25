import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

interface ActiveMissionProps {
  imageUrl: string;
  altTag: string;
  titleTag: string;
}

const MissionImage = styled("div")`
  position: relative;
  background-color: var(--dark-blue);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 0 0 4px hsla(0, 0%, 0%, 0.4);
  overflow: hidden;
  isolation: isolate;
`;

const Image = styled("img")`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

export const ActiveMission: Component<ActiveMissionProps> = (props) => {
  return (
    <MissionImage>
      <Image src={props.imageUrl} alt={props.altTag} title={props.titleTag} />
    </MissionImage>
  );
};
