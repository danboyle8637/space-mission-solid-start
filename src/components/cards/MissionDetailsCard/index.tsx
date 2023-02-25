import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { CardHeader } from "./CardHeader";
import { Description } from "./Description";
import { Footer } from "./Footer";
import { CancelMissionButton } from "../../buttons/CancelMissionButton";
import type { MissionId } from "../../../types";

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
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  width: 600px;
`;

export const MissionDetailsCard: Component<DetailsProps> = (props) => {
  return (
    <CardContainer>
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
