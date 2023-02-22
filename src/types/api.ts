import { MissionId, MissionDoc } from "./index";

export interface ActivateMissionUserDocBody {
  missionId: MissionId;
}

export interface ActivateMissionStatsDocBody {
  missionId: MissionId;
  goals: {
    isGoal1Complete: boolean;
    isGoal2Complete: boolean;
    isGoal3Complete: boolean;
  };
}
