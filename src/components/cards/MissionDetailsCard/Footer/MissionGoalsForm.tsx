import { createEffect } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { GoalCheckboxFake } from "../../../forms/GoalCheckoutFake";
import { user } from "../../../../../lib/userStore";
import {
  missionStats,
  updateMissionStats,
} from "../../../../../lib/missionStore";
import { endpoints } from "../../../../utils/endpoints";
import type { MissionId } from "../../../../types";
import type { CompletedMission } from "../../../../../lib/missionStore";

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

  const handleUpdateMissionStats = async (
    name: CompletedMission,
    value: boolean
  ) => {
    updateMissionStats(name);
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
