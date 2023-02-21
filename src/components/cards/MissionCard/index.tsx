import { createSignal } from "solid-js";
import { Portal } from "solid-js/web";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { MissionBanner } from "./MissionBanner";
import { MissionDescription } from "./Description";
import { Footer } from "./Footer";
import { MissionDetailsModal } from "../../overlays/MissionDetailsModal";
import { MissionDetailsCard } from "../../cards/MissionDetailsCard";
import { useIsHovering } from "../../../hooks/useIsHovering";
import { userStore } from "../../../../lib/userStore";
import { MissionId } from "../../../types";

interface MissionCardProps {
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

export const MissionCard: React.FC<MissionCardProps> = ({
  missionId,
  coverImage,
  altTag,
  titleTag,
  headline,
  description,
  difficulty,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const activeMission = userStore((state) => state.activeMission);

  const { isHovering, toggleIsHovering } = useIsHovering();

  const isActive = activeMission === missionId;

  const toggleMissionDetails = () => {
    setIsDetailsOpen((prevValue) => !prevValue);
  };

  const closeMissionDetails = () => {
    setIsDetailsOpen(false);
  };

  return (
    <>
      <CardContainer
        type="button"
        aria-label="Mission button"
        onMouseOver={toggleIsHovering}
        onMouseLeave={toggleIsHovering}
        onClick={toggleMissionDetails}
      >
        <BannerImage
          imageUrl={coverImage}
          altTag={altTag}
          titleTag={titleTag}
        />
        <MissionDescription headline={headline} description={description} />
        <Footer isActive={isActive} isHovering={isHovering} />
      </CardContainer>
      <Portal>
        <MissionDetailsOverlay
          isOpen={isDetailsOpen}
          closeOverlay={closeMissionDetails}
        >
          <MissionDetailsCard
            isOpen={isDetailsOpen}
            missionId={missionId}
            imageUrl={coverImage}
            altTag={altTag}
            titleTag={titleTag}
            headline={headline}
            description={description}
            isActive={isActive}
          />
        </MissionDetailsOverlay>
      </Portal>
    </>
  );
};
