import { createSignal } from "solid-js";
import type { MissionId, MissionDoc } from "../src/types/index";

interface MissionStats {
  isGoal1Complete: boolean;
  isGoal2Complete: boolean;
  isGoal3Complete: boolean;
}

export type CompletedMission = "missionGoal1" | "missionGoal2" | "missionGoal3";

interface ActiveMission {
  missionId: MissionId | null;
  coverImage: string;
  altTag: string;
  titleTag: string;
  headline: string;
  description: string;
  difficulty: number;
}

export const [missionList, setMissionList] = createSignal<MissionDoc[]>([]);

export const updateMissionList = (availableMissions: MissionDoc[]) => {
  setMissionList(availableMissions);
};

// *************** Active Mission Stats *************** //

export const [missionStats, setMissionStats] = createSignal<MissionStats>({
  isGoal1Complete: false,
  isGoal2Complete: false,
  isGoal3Complete: false,
});

export const updateMissionStats = (completedMission: CompletedMission) => {
  switch (completedMission) {
    case "missionGoal1": {
      setMissionStats((prevValue) => ({
        ...prevValue,
        isGoal1Complete: true,
      }));
      break;
    }
    case "missionGoal2": {
      setMissionStats((prevValue) => ({
        ...prevValue,
        isGoal2Complete: true,
      }));
      break;
    }
    case "missionGoal3": {
      setMissionStats((prevValue) => ({
        ...prevValue,
        isGoal3Complete: true,
      }));
      break;
    }
  }
};

export const resetMissionStats = () => {
  setMissionStats(() => ({
    isGoal1Complete: false,
    isGoal2Complete: false,
    isGoal3Complete: false,
  }));
};

// *************** Active Mission Doc *************** //

export const [activeMissionData, setActiveMissionData] =
  createSignal<ActiveMission>({
    missionId: null,
    coverImage: "",
    altTag: "",
    titleTag: "",
    headline: "",
    description: "",
    difficulty: 0,
  });

export const updateActiveMission = (activeMission: ActiveMission) => {
  setActiveMissionData(activeMission);
};
