import { createEffect, createMemo, children } from "solid-js";
import { styled } from "solid-styled-components";
import { Transition } from "solid-transition-group";
import { animate } from "motion";
import type { Component, JSX, JSXElement } from "solid-js";

// import { toggleScrollingOnOverlay } from "../utils/helpers";

interface TransitionProps {
  isOpen: boolean;
  isMobileLayout: boolean;
  handleClick: () => void;
  children: JSXElement;
}

const Container = styled("div")`
  /* position: var(--container-position); */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ClickLayer = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsla(0, 0%, 0%, 0.3);
  z-index: 1;
`;

export const InstantTransition: Component<TransitionProps> = (props) => {
  const child = children(() => props.children);

  const onEnter = (node: Element, done: () => void): void => {
    if (props.isOpen) {
      animate(node, { opacity: [0, 1] }, { duration: 0 }).finished.then(() =>
        done()
      );
    }
  };

  const onExit = (node: Element, done: () => void): void => {
    if (!props.isOpen) {
      animate(
        node,
        { opacity: [1, 0] },
        { duration: 0, delay: 0.4 }
      ).finished.then(() => done());
    }
  };

  const styles = createMemo(
    () =>
      ({
        "--container-position": props.isMobileLayout ? "fixed" : "absolute",
      } as JSX.CSSProperties)
  );

  return (
    <Transition onEnter={onEnter} onExit={onExit}>
      {props.isOpen ? (
        <Container style={styles()}>
          <ClickLayer onPointerUp={props.handleClick} />
          {props.isOpen ? child() : null}
        </Container>
      ) : null}
    </Transition>
  );
};
