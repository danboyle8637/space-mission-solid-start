import { createEffect, createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSX } from "solid-js";

import { CheckmarkIcon } from "../../svgs/CheckIcon";

interface CheckboxProps {
  isComplete: boolean;
  makeSmall?: boolean;
}

const Box = styled("div")`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsla(240, 100%, 100%, 0.35);
  border-radius: var(--box-border-radius);
  width: var(--box-dimensions);
  height: var(--box-dimensions);
  box-shadow: 0 1px 4px 1px hsla(240, 0%, 0%, 0.3);
`;

const Check = styled("div")`
  width: 100%;
`;

export const Checkbox: Component<CheckboxProps> = (props) => {
  const styles = createMemo(
    () =>
      ({
        "--box-border-radius": props.makeSmall ? "8px" : "14px",
        "--box-dimensions": props.makeSmall ? "28px" : "54px",
      } as JSX.CSSProperties)
  );

  return (
    <Box style={styles()}>
      <Check>
        <CheckmarkIcon runAction={props.isComplete} />
      </Check>
    </Box>
  );
};
