import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { MissionCard } from "../../components/cards/MissionCard";
import { MissionDoc } from "../../types";

interface CardsProps {
  missions: MissionDoc[];
}

const MissionsContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  column-gap: 20px;
  row-gap: 40px;
  width: 1100px;
`;

export const MissionCards: Component<CardsProps> = (props) => {
  const cards = createMemo(() =>
    props.missions.map((mission) => {
      const missionId = mission.missionId;
      const headline = mission.headline;
      const description = mission.description;
      const imageUrl = mission.coverImage;
      const altTag = mission.altTag;
      const titleTag = mission.titleTag;
      const difficulty = mission.difficulty;

      return (
        <MissionCard
          missionId={missionId}
          coverImage={imageUrl}
          altTag={altTag}
          titleTag={titleTag}
          headline={headline}
          description={description}
          difficulty={difficulty}
        />
      );
    })
  );

  return <MissionsContainer>{cards()}</MissionsContainer>;
};
