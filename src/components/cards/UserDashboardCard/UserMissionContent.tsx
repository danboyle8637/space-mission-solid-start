import { onMount, createEffect, createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSX } from "solid-js";

import { ActiveMission } from "../../images/ActiveMission";
import { MissionPlaceholder } from "./MissionPlaceholder";
import { user } from "../../../../lib/userStore";
import {
  missionList,
  activeMissionData,
  updateActiveMission,
} from "../../../../lib/missionStore";
import { capitalizeName } from "../../../utils/helpers";

const Container = styled("div")`
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 20px;
  justify-items: start;
  align-items: center;
  width: 100%;
`;

const IdentityContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 4px;
  justify-items: start;
  width: 100%;
`;

const Label = styled("p")`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--label-color, var(--accent-pink));
`;

export const UserMissionContent: Component = () => {
  onMount(() => {
    if (user().activeMission.length > 0 && missionList.length > 0) {
      const activeMissionData = missionList().find(
        (m) => m.missionId === user().activeMission
      );

      if (activeMissionData) {
        updateActiveMission(activeMissionData);
      }
    }
  });

  const missionName = createMemo(() =>
    user().activeMission.length > 0
      ? capitalizeName(user().activeMission)
      : "No Active Mission"
  );

  const styles = {
    "--label-color": "var(--accent-purple)",
  } as JSX.CSSProperties;

  return (
    <Container>
      <IdentityContainer>
        <Label>Active Mission:</Label>
        <Label style={styles}>{missionName}</Label>
      </IdentityContainer>
      {user().activeMission !== "" && activeMissionData().coverImage !== "" ? (
        <ActiveMission
          imageUrl={activeMissionData().coverImage}
          altTag={activeMissionData().altTag}
          titleTag={activeMissionData().titleTag}
        />
      ) : (
        <MissionPlaceholder />
      )}
    </Container>
  );
};
