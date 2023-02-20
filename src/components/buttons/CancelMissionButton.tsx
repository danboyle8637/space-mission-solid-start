import {} from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { CloseIcon } from "../cssDrawings/CloseIcon";
import { endpoints } from "../../utils/endpoints";
import { userStore } from "../../../lib/userStore";
import { MissionId } from "../../types";
import { networkStore } from "../../../lib/networkStore";
import { missionStatsStore } from "../../../lib/missionStatsStore";
import { getErrorMessage } from "../../utils/utilityFunctions";

interface ButtonProps {
  missionId: MissionId;
}

const CancelButton = styled("button")`
  position: absolute;
  top: 20px;
  right: 20px;
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
  const { userId, setUser, getUserId } = userStore((state) => ({
    userId: state.userId,
    setUser: state.setUser,
    getUserId: state.getUserFromMagic,
  }));

  const setStatsDoc = missionStatsStore((state) => state.setStatsDoc);

  const { setErrorMessage, toggleErrorToaster } = networkStore((state) => ({
    setErrorMessage: state.setErrorMessage,
    toggleErrorToaster: state.toggleErrorToaster,
  }));

  const handleCancelMission = async () => {
    // set loader that says cancelling mission
    console.log("Set a loading state of some sort");

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_DEV_URL
        : process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}/${endpoints.CANCEL_MISSION}`;

    const cancelBody = {
      missionId: missionId,
    };

    try {
      if (userId === "") {
        getUserId();
      }

      const cancelRes = await fetch(url, {
        method: "POST",
        headers: {
          "should-update-user-cache": "true",
          userId: userId,
        },
        body: JSON.stringify(cancelBody),
      });

      const cancelData = await cancelRes.json();
      const userDoc = cancelData.userDoc;
      setUser(userDoc);
      setStatsDoc({
        isGoal1Complete: false,
        isGoal2Complete: false,
        isGoal3Complete: false,
      });
    } catch (error) {
      setErrorMessage("Cancel Mission Call", getErrorMessage(error));
      toggleErrorToaster();
    }
  };

  return (
    <CancelButton type="button" onClick={handleCancelMission}>
      <CloseIcon isOpen={true} width={20} />
      Cancel Mission
    </CancelButton>
  );
};
