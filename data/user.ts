import { UserDoc } from "../src/types";

export const dan: UserDoc = {
  userId: "123456",
  emailAddress: "dan@dan.com",
  activeMission: "pleiades",
  finishedMissions: [],
  callsign: "maverick",
  avatar: "",
  missionStatsDocId:
    "89619ba6e0456b0115917ac66c518a5d6eda3073af743d84b96982a5acd4d946",
};

export const kindal: UserDoc = {
  userId: "2468",
  emailAddress: "kindal@kindal.com",
  activeMission: "",
  finishedMissions: [],
  callsign: "",
  avatar: "",
  missionStatsDocId: null,
};

export const nike: UserDoc = {
  userId: "654321",
  emailAddress: "nike@cat.com",
  activeMission: "mars",
  finishedMissions: ["titan"],
  callsign: "",
  avatar: "",
  missionStatsDocId:
    "27c3209567e0363c3e64fa4ffd3905bc82129775065e973007a964cb401bdb36",
};
