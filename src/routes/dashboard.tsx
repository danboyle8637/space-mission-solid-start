import {} from "solid-js";
import { Title } from "solid-start";

import { DashboardView } from "../views/Dashboard";

// Test data
import { missions } from "../../data/missions";

export default function Dashboard() {
  return (
    <>
      <Title>Space Mission Solid Start and Cloudflare</Title>
      <DashboardView missions={missions} />
    </>
  );
}
