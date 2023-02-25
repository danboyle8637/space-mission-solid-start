import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { UserDoc } from "../src/types";

interface UserState {
  userId: string;
  emailAddress: string;
  activeMission: string;
  finishedMissions: string[];
  callsign: string;
  avatar: string;
}

// Update one item at a time... you don't need to replace the remaining state
// export const [user, setUser] = createStore<UserState>({
//   userId: "",
//   emailAddress: "",
//   activeMission: "",
//   finishedMissions: [],
//   callsign: "",
//   avatar: "",
// });

export const [user, setUser] = createSignal<UserState>({
  userId: "",
  emailAddress: "",
  activeMission: "",
  finishedMissions: [],
  callsign: "",
  avatar: "",
});

export const updateUser = (user: UserDoc) => {
  setUser(user);
};
