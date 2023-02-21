import { children, Component, JSXElement } from "solid-js";

import { InstantTransition } from "../../animations/InstantTransition";

interface ModalProps {
  isOpen: boolean;
  closeOverlay: () => void;
  children: JSXElement;
}

export const MissionDetailsModal: Component<ModalProps> = (props) => {
  const child = children(() => props.children);

  return (
    <InstantTransition
      isOpen={props.isOpen}
      handleClick={props.closeOverlay}
      isMobileLayout={false}
    >
      {child()}
    </InstantTransition>
  );
};
