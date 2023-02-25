import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { ActionButton } from "../../../buttons/ActionButton";
import { endpoints } from "../../../../utils/endpoints";
import { user, updateUser } from "../../../../../lib/userStore";
import { missionStats } from "../../../../../lib/missionStore";
import {
  errorState,
  updateErrorMessage,
} from "../../../../../lib/networkStore";
import { getErrorMessage } from "../../../../utils/helpers";
import type { MissionId, UserDoc } from "../../../../types";
import {
  ActivateMissionUserDocBody,
  ActivateMissionStatsDocBody,
} from "../../../../types/api";

// TODO - GET RID OF THESE IN PRODUCTION
import { missions } from "../../../../../data/missions";
import { setActiveMissionData } from "../../../../../lib/missionStore";

interface StartMissionProps {
  missionId: MissionId;
}

const Container = styled("div")`
  padding-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 20px;
  justify-items: center;
  width: 100%;
`;

const MissionText = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  color: #f8f8f8;
`;

export const StartMission: Component<StartMissionProps> = (props) => {
  // TODO - Figure out how to get the user with the right Solid Start api method

  const handleStartMission = () => {
    // Update the user doc with the active mission
    const updatedUser: UserDoc = {
      ...user(),
      activeMission: props.missionId,
    };

    updateUser(updatedUser);

    // Create the stats table for this mission
    const activeMission = missions.find((m) => m.missionId === props.missionId);

    setActiveMissionData(activeMission!);
  };

  const buttonLabel = createMemo(() => {
    if (
      missionStats().isGoal1Complete &&
      missionStats().isGoal2Complete &&
      missionStats().isGoal3Complete
    ) {
      return "Filing Completed Missing Breifs";
    }

    if (user().activeMission === "") {
      return "Activate Mission";
    }

    return "You're Out On Mission";
  });

  return (
    <Container>
      <MissionText>Do You Accept This Mission?</MissionText>
      <ActionButton
        handleClick={handleStartMission}
        isDisabled={user().activeMission !== ""}
      >
        {buttonLabel()}
      </ActionButton>
    </Container>
  );
};
