import { createEffect, createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSX } from "solid-js";

import { overlayCloseButtonAni } from "../../animations";

interface IconProps {
  isOpen: boolean;
  width?: number;
}

const IconContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  width: var(--icon-size);
  height: var(--icon-size);
`;

const XCross = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background: var(--close-icon-color, #f8f8f8);
  border-radius: 20px;
  width: calc((var(--icon-size) * 5) / 34);
  height: 100%;
  opacity: 0;
`;

export const CloseIcon: Component<IconProps> = (props) => {
  let leftCrossRef: HTMLDivElement;
  let rightCrossRef: HTMLDivElement;

  createEffect(() => {
    if (props.isOpen) {
      overlayCloseButtonAni(leftCrossRef, rightCrossRef);
    }
  });

  const styles = createMemo(
    () =>
      ({
        "--icon-size": props.width ? `${props.width}px` : "34px",
      } as JSX.CSSProperties)
  );

  return (
    <IconContainer style={styles()}>
      <XCross ref={leftCrossRef!} />
      <XCross ref={rightCrossRef!} />
    </IconContainer>
  );
};
