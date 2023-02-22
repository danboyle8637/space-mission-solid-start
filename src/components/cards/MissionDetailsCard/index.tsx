import { createEffect } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { CardHeader } from "./CardHeader";
import { Description } from "./Description";
import { Footer } from "./Footer";
import { CancelMissionButton } from "../../buttons/CancelMissionButton";
import { missionDetailsOpen, missionDetailsClosed } from "../../../animations";
import { MissionId } from "../../../types";

interface DetailsProps {
  isOpen: boolean;
  missionId: MissionId;
  imageUrl: string;
  altTag: string;
  titleTag: string;
  headline: string;
  description: string;
  isActive: boolean;
}

const CardContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  background-color: var(--dark-blue);
  border-radius: 20px;
  box-shadow: 0 0 0 12px hsla(0, 0%, 0%, 0.3);
  width: 600px;
  opacity: 0;
  transform: translate(-50%, -60%) scale(0.9);
  overflow: hidden;
  z-index: 1;
`;

export const MissionDetailsCard: Component<DetailsProps> = (props) => {
  let missionDetailsCardRef: HTMLDivElement;

  createEffect(() => {
    if (props.isOpen) {
      missionDetailsOpen(missionDetailsCardRef);
    }

    if (!props.isOpen) {
      missionDetailsClosed(missionDetailsCardRef);
    }
  });

  return (
    <CardContainer ref={missionDetailsCardRef!} tabIndex={-1}>
      <CardHeader
        imageUrl={props.imageUrl}
        altTag={props.altTag}
        titleTag={props.titleTag}
        headline={props.headline}
      />
      <Description description={props.description} />
      <Footer isActive={props.isActive} missionId={props.missionId} />
      {props.isActive ? (
        <CancelMissionButton missionId={props.missionId} />
      ) : null}
    </CardContainer>
  );
};
