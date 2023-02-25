export interface InputValue {
  value: string;
  valid: boolean;
}

export type InputOptions = {
  initial: boolean;
  touched: boolean;
};

export type UpdateValueFunction = (event: InputEvent) => void;

export type UpdateOptionsFunction = (event: FocusEvent) => void;

export type UpdateValueFunctionWithKeyboard = (
  event: KeyboardEvent,
  value: number,
  name: string
) => void;

// ********** API Types ********** //

export type MissionId = "mars" | "titan" | "pleiades" | "prodigious" | "x24c89";

export interface MissionDoc {
  missionId: MissionId;
  coverImage: string;
  altTag: string;
  titleTag: string;
  headline: string;
  description: string;
  difficulty: number;
}

export interface UserDoc {
  userId: string;
  emailAddress: string;
  activeMission: string;
  finishedMissions: string[];
  callsign: string;
  avatar: string;
}

export interface Goals {
  isGoal1Complete: boolean;
  isGoal2Complete: boolean;
  isGoal3Complete: boolean;
}

export interface MissionStatsDoc {
  missionId: MissionId;
  goals: Goals;
}
