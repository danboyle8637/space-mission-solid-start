import { createSignal } from "solid-js";

interface MissionStats {
  isGoal1Complete: boolean;
  isGoal2Complete: boolean;
  isGoal3Complete: boolean;
}

type CompletedMission = 1 | 2 | 3;

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
