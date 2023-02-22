import type { Component } from "solid-js";

import { StartMission } from "./StartMission";
import { MissionGoalsForm } from "./MissionGoalsForm";
import { MissionId } from "../../../../types";

interface FooterProps {
  isActive: boolean;
  missionId: MissionId;
}

export const Footer: Component<FooterProps> = (props) => {
  return (
    <>
      {props.isActive ? (
        <MissionGoalsForm missionId={props.missionId} />
      ) : (
        <StartMission missionId={props.missionId} />
      )}
    </>
  );
};
