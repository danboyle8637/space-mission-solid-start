import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

const Container = styled("div")`
  position: relative;
  width: 100%;
  isolation: isolate;
`;

const LargeDrop = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #5e1c1c;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  z-index: 1;
`;

const SmallDrop = styled("div")`
  position: absolute;
  background-color: #5e1c1c;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  z-index: 1;
`;

export const BrokenHelmet: Component = () => {
  return (
    <Container>
      <img
        src="https://ik.imagekit.io/csu76xuqqlwj/nerds-who-sell/projects/space-mission/space-mission-offline-image_zSKbqeenz.png?ik-sdk-version=javascript-1.4.3&updatedAt=1645557111392"
        alt="Space Mission space helmet"
        title="Space Mission"
      />
      <LargeDrop />
      <SmallDrop />
    </Container>
  );
};
