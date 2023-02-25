import { createEffect, createSignal, createMemo } from "solid-js";
import { Portal } from "solid-js/web";
import { styled } from "solid-styled-components";
import type { Component, JSX } from "solid-js";

import { MissionBanner } from "./MissionBanner";
import { MissionDescription } from "./Description";
import { Footer } from "./Footer";
import { MissionDetailsModal } from "../../overlays/MissionDetailsModal";
import { MissionDetailsCard } from "../MissionDetailsCard";
import { user, updateUser } from "../../../../lib/userStore";
import { missionStats, resetMissionStats } from "../../../../lib/missionStore";
import {
  isMissionOverlayOpen,
  toggleIsMissionOverlayOpen,
  closeIsOverlayOpen,
} from "../../../../lib/portalStore";
import { toggleScrollingOnOverlay } from "../../../utils/helpers";
import type { MissionId, UserDoc } from "../../../types";

interface CardProps {
  missionId: MissionId;
  coverImage: string;
  altTag: string;
  titleTag: string;
  headline: string;
  description: string;
  difficulty: number;
}

const CardContainer = styled.button`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  background-color: var(--dark-blue);
  border-radius: 12px;
  border: none;
  outline: none;
  width: 350px;
  box-shadow: 0 0 0 6px hsla(0, 0%, 0%, 0.4);
  cursor: pointer;
  overflow: hidden;
  opacity: var(--card-opacity);
  pointer-events: var(--card-pointer-events);
  transform: translateY(0);
  transition: transform, box-shadow, 300ms ease-in-out;

  &:focus {
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-pink);
    transform: translateY(-8px);
  }
  &:hover {
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-pink);
    transform: translateY(-8px);
  }
`;

export const MissionCard: Component<CardProps> = (props) => {
  const [isHovering, setIsHovering] = createSignal<boolean>(false);

  const toggleIsHovering = () => {
    setIsHovering((prevValue) => !prevValue);
  };

  const isActive = createMemo(() => user().activeMission === props.missionId);

  const isOpen = createMemo(
    () =>
      isMissionOverlayOpen().isOpen &&
      isMissionOverlayOpen().mission === props.missionId
  );

  const openCardContainer = () => {
    toggleIsMissionOverlayOpen(props.missionId);
  };

  createEffect(() => {
    toggleScrollingOnOverlay(isOpen());
  });

  createMemo(() => {
    if (user().activeMission === props.missionId) {
      if (
        missionStats().isGoal1Complete &&
        missionStats().isGoal2Complete &&
        missionStats().isGoal3Complete
      ) {
        const completedMission = props.missionId;
        const updatedUser: UserDoc = {
          ...user(),
          activeMission: "",
          finishedMissions: [...user().finishedMissions, completedMission],
        };

        updateUser(updatedUser);

        setTimeout(() => {
          resetMissionStats();
          toggleIsMissionOverlayOpen(props.missionId);
        }, 1500);
      }
    }
  });

  const isMissionComplete = createMemo(() => {
    return user().finishedMissions.includes(props.missionId);
  });

  const styles = createMemo(
    () =>
      ({
        "--card-opacity": isMissionComplete() ? 0.3 : 1,
        "--card-pointer-events": isMissionComplete() ? "none" : "auto",
      } as JSX.CSSProperties)
  );

  return (
    <>
      <CardContainer
        style={styles()}
        type="button"
        aria-label="Mission button"
        onMouseOver={toggleIsHovering}
        onMouseLeave={toggleIsHovering}
        onClick={openCardContainer}
        disabled={isMissionComplete()}
      >
        <MissionBanner
          imageUrl={props.coverImage}
          altTag={props.altTag}
          titleTag={props.titleTag}
        />
        <MissionDescription
          headline={props.headline}
          description={props.description}
        />
        <Footer
          isActive={isActive()}
          isHovering={isHovering()}
          isMissionComplete={isMissionComplete()}
        />
      </CardContainer>
      <Portal>
        <MissionDetailsModal
          isOpen={isOpen()}
          closeOverlay={closeIsOverlayOpen}
        >
          <MissionDetailsCard
            isOpen={isOpen()}
            missionId={props.missionId}
            imageUrl={props.coverImage}
            altTag={props.altTag}
            titleTag={props.titleTag}
            headline={props.headline}
            description={props.description}
            isActive={isActive()}
          />
        </MissionDetailsModal>
      </Portal>
    </>
  );
};
