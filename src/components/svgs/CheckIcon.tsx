import { createEffect, onCleanup } from "solid-js";
import type { Component } from "solid-js";

import { checkmarkOn, checkmarkOff } from "../../animations";
import { SVGProps } from "./SpaceMission";

interface CheckmarkIconProps extends SVGProps {
  runAction: boolean;
}

export const CheckmarkIcon: Component<CheckmarkIconProps> = (props) => {
  let checkRef: SVGPathElement;

  createEffect(() => {
    if (props.runAction) {
      checkmarkOn(checkRef);
    }

    if (!props.runAction) {
      checkmarkOff(checkRef);
    }
  });

  onCleanup(() => {
    checkmarkOn(checkRef, true);
    checkmarkOff(checkRef, true);
  });

  return (
    <svg
      id="form-check"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 164.85 127.53"
    >
      <path
        ref={checkRef!}
        id="check"
        fill="none"
        stroke="var(--base-blue)"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="34"
        stroke-dashoffset="1"
        stroke-dasharray="1"
        pathLength="1"
        opacity="0"
        visibility="hidden"
        d="M147.85 17l-93.52 93.53L17 73.2"
      />
    </svg>
  );
};
