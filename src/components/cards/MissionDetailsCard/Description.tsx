import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

interface DescriptionProps {
  description: string;
}

const Container = styled("div")`
  padding: 20px;
  width: 100%;
`;

const Descriptioon = styled("p")`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--accent-purple);
  line-height: 1.6;
  text-align: left;
`;

export const Description: Component<DescriptionProps> = (props) => {
  return (
    <Container>
      <Descriptioon>{props.description}</Descriptioon>
    </Container>
  );
};
