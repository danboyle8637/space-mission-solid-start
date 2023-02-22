import {} from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { ActionButton } from "../../../buttons/ActionButton";
import { endpoints } from "../../../../utils/endpoints";
import { user } from "../../../../../lib/userStore";
import { missionStats } from "../../../../../lib/missionStore";
import {
  errorState,
  updateErrorMessage,
} from "../../../../../lib/networkStore";
import {} from "../../../../../lib/portalStore";
import { getErrorMessage } from "../../../../utils/helpers";
import { MissionId, UserDoc } from "../../../../types";
import {
  ActivateMissionUserDocBody,
  ActivateMissionStatsDocBody,
} from "../../../../types/api";

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
    const activateMission = async () => {
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_API_DEV_URL
          : process.env.NEXT_PUBLIC_API_URL;

      const userUrl = `${baseUrl}/${endpoints.ACTIVATE_MISSION}`;
      const statsUrl = `${baseUrl}/${endpoints.HANDLE_STATS_DOC}/create-stats-doc`;

      const userBody: ActivateMissionUserDocBody = {
        missionId: props.missionId,
      };

      const statsBody: ActivateMissionStatsDocBody = {
        missionId: props.missionId,
        goals: {
          isGoal1Complete: false,
          isGoal2Complete: false,
          isGoal3Complete: false,
        },
      };

      try {
        if (user().userId === "") {
          // Go fetch user
        }

        const useDocResponse = await fetch(userUrl, {
          method: "POST",
          headers: {
            "should-update-user-cache": "true",
            userId: user().userId,
          },
          body: JSON.stringify(userBody),
        });

        const createStatsDoc = await fetch(statsUrl, {
          method: "POST",
          headers: {
            userId: user().userId,
          },
          body: JSON.stringify(statsBody),
        });

        const userData = await useDocResponse.json();

        const statsData = await createStatsDoc.json();

        if (!useDocResponse.ok) {
          // Show toaster that activating the mission did not work... try again.
        }

        if (!createStatsDoc.ok) {
          // Show toaster that mission stats doc was not created and they need to try again.
        }

        const userDoc: UserDoc = userData.userDoc;
        // Setting user into state... should not be needed per say

        const goals = statsData.statsDoc;
        // Setting stats in state so we can access them
      } catch (error) {
        updateErrorMessage("Start Mission Error", getErrorMessage(error));
        // TODO - Need to control an error modal. Need to figure out all the different modals
      }
    };

    if (props.missionId !== null) {
      activateMission();
    }
  };

  return (
    <Container>
      <MissionText>Do You Want This Mission?</MissionText>
      <ActionButton
        handleClick={handleStartMission}
        isDisabled={user().activeMission !== ""}
      >
        {user().activeMission !== ""
          ? "You're Out On A Mission"
          : "Activate Mission"}
      </ActionButton>
    </Container>
  );
};
