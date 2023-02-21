import {} from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { GoalCheckboxFake } from "../../../forms/GoalCheckoutFake";
import { user } from "../../../../../lib/userStore";
import {
  missionStats,
  updateMissionStats,
} from "../../../../../lib/missionStore";
import { endpoints } from "../../../../utils/endpoints";
import { MissionId } from "../../../../types";

interface GoalsFormProps {
  missionId: MissionId;
}

const GoalForm = styled.form`
  padding: 0 20px 20px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
`;

export const MissionGoalsForm: Component<GoalsFormProps> = (props) => {
  // TODO - Read about data fetching in Solid because if the user is not in memory. The uesr needs to be retreved... not sure the best way to do this yet
  // Something here

  const handleUpdateMissionStats = async (name: string, value: boolean) => {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_DEV_URL
        : process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}/${endpoints.HANDLE_STATS_DOC}/update-stats-doc`;

    const updateStatsBody = {
      missionId: props.missionId,
      goals: {
        isGoal1Complete:
          name === "missionGoal1" ? value : missionStats().isGoal1Complete,
        isGoal2Complete:
          name === "missionGoal2" ? value : missionStats().isGoal2Complete,
        isGoal3Complete:
          name === "missionGoal3" ? value : missionStats().isGoal3Complete,
      },
    };

    const statsRes = await fetch(url, {
      method: "POST",
      headers: {
        userId: user().userId,
      },
      body: JSON.stringify(updateStatsBody),
    });

    const statsData = await statsRes.json();
    updateMissionStats({
      ...statsData.statsDoc,
    });
  };

  return (
    <GoalForm>
      <GoalCheckboxFake
        name="missionGoal1"
        label="Complete Goal 1"
        isChecked={missionStats().isGoal1Complete}
        handleUpdateMissionStats={handleUpdateMissionStats}
        isDisabled={false}
      />
      <GoalCheckboxFake
        name="missionGoal2"
        label="Complete Goal 2"
        isChecked={missionStats().isGoal2Complete}
        handleUpdateMissionStats={handleUpdateMissionStats}
        isDisabled={!missionStats().isGoal1Complete}
      />
      <GoalCheckboxFake
        name="missionGoal3"
        label="Complete Goal 3"
        isChecked={missionStats().isGoal3Complete}
        handleUpdateMissionStats={handleUpdateMissionStats}
        isDisabled={
          !missionStats().isGoal1Complete || !missionStats().isGoal2Complete
        }
      />
    </GoalForm>
  );
};
