import { createSignal } from "solid-js";
import type { MissionId, MissionDoc } from "../src/types/index";

interface MissionStats {
  isGoal1Complete: boolean;
  isGoal2Complete: boolean;
  isGoal3Complete: boolean;
}

type CompletedMission = 1 | 2 | 3;

type ActiveMission = {
  missionId: MissionId | null;
  coverImage: string;
  altTag: string;
  titleTag: string;
  headline: string;
  description: string;
  difficulty: number;
};

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
    case 1: {
      setMissionStats((prevValue) => ({
        ...prevValue,
        isGoal1Complete: true,
      }));
      break;
    }
    case 2: {
      setMissionStats((prevValue) => ({
        ...prevValue,
        isGoal2Complete: true,
      }));
      break;
    }
    case 3: {
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
