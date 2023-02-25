import { children } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSXElement } from "solid-js";

interface CardProps {
  children: JSXElement;
}

const Container = styled("div")`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-blue);
  border-radius: 12px;
  width: 100%;
  max-width: 300px;
`;

export const BaseCard: Component<CardProps> = (props) => {
  const child = children(() => props.children);

  return <Container>{child()}</Container>;
};
