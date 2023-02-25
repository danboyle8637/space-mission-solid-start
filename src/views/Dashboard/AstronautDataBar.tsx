import {} from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { BaseCard } from "../../components/cards/UserDashboardCard/BaseCard";
import { UserIdentityContent } from "../../components/cards/UserDashboardCard/UserIdentityContent";
import { UserMissionContent } from "../../components/cards/UserDashboardCard/UserMissionContent";
import { UserMissionStatsContent } from "../../components/cards/UserDashboardCard/UserMissionStatsContent";
import { UserDoc } from "../../types";
import { user } from "../../../lib/userStore";
import {} from "../../../lib/networkStore";
import { endpoints } from "../../utils/endpoints";
import { getErrorMessage } from "../../utils/helpers";

const BarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: fit-content;
`;

export const AstronautDataBar = () => {
  return (
    <BarContainer>
      <BaseCard>
        <UserIdentityContent />
      </BaseCard>
      <BaseCard>
        <UserMissionContent />
      </BaseCard>
      <BaseCard>
        <UserMissionStatsContent />
      </BaseCard>
    </BarContainer>
  );
};
