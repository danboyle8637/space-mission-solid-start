import { styled } from 'solid-styled-components'
import type { Component } from "solid-js";

const Image = styled("img")`
  width: 100%;
  height: 100%;
`

export const SpaceMissionHelmet: Component = () => {
  return (
    <Image
      src="https://ik.imagekit.io/csu76xuqqlwj/nerds-who-sell/projects/space-mission/space-mission-logo_b9B98nvMW.png?ik-sdk-version=javascript-1.4.3"
      alt="Space Mission space helmet"
      title="Space Mission"
      width={138}
      height={148}
    />
  );
};
