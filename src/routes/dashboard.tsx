import {} from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { DashboardView } from '../views/Dashboard'

// Test data
import { missions } from '../../data/missions'

export default function Dashboard() {
  return <DashboardView missions={missions} />
};

