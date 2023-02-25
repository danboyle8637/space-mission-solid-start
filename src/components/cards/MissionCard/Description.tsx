import { createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

interface DescriptionProps {
  headline: string;
  description: string;
}

const Container = styled("div")`
  padding: 12px 12px 20px 12px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 8px;
  justify-items: start;
  width: 100%;
  pointer-events: none;
`;

const CardHeadline = styled("h3")`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--accent-pink);
`;

const CardDescription = styled("p")`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--accent-purple);
  line-height: 1.6;
  text-align: left;
  text-overflow: ellipsis;
`;

export const MissionDescription: Component<DescriptionProps> = (props) => {
  const shortDescription = createMemo(() => {
    return props.description.slice(0, 120);
  });

  return (
    <Container>
      <CardHeadline>{props.headline}</CardHeadline>
      <CardDescription>{shortDescription()} ...</CardDescription>
    </Container>
  );
};
