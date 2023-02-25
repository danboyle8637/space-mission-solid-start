import {} from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { CloseIcon } from "../cssDrawings/CloseIcon";
import { endpoints } from "../../utils/endpoints";
import { user, updateUser } from "../../../lib/userStore";
import {
  errorState,
  updateErrorMessage,
  toggleErrorOverlay,
} from "../../../lib/networkStore";
import { missionStats, resetMissionStats } from "../../../lib/missionStore";
import type { MissionId, UserDoc } from "../../types";
import { getErrorMessage } from "../../utils/helpers";

interface ButtonProps {
  missionId: MissionId;
}

const CancelButton = styled("button")`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 12px 24px;
  display: grid;
  grid-template-columns: min-content 1fr;
  justify-items: start;
  align-items: center;
  gap: 12px;
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #f8f8f8;
  background-color: #ff0055;
  border-radius: 12px;
  border: none;
  width: fit-content;
  outline: none;
  cursor: pointer;
  box-shadow: 0 4px 12px 1px hsla(0, 0%, 0%, 0.5);
  z-index: 1;
  transition: box-shadow 300ms ease-in-out;
  &:focus {
    box-shadow: 0 0 0 3px #9b1743, 0 0 0 6px #ff0055;
  }
  &:hover {
    box-shadow: 0 0 0 3px #9b1743, 0 0 0 6px #ff0055;
  }
`;

export const CancelMissionButton: Component<ButtonProps> = (props) => {
  const handleCancelMission = async () => {
    // set loader that says cancelling mission

    const updatedUser: UserDoc = {
      ...user(),
      activeMission: "",
    };

    updateUser(updatedUser);
    resetMissionStats();
  };

  return (
    <CancelButton type="button" onClick={handleCancelMission}>
      <CloseIcon isOpen={true} width={20} />
      Cancel Mission
    </CancelButton>
  );
};
