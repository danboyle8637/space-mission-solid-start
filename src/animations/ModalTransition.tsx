import { Transition } from "solid-transition-group";
import { animate } from "motion";
import { children, Component, JSXElement } from "solid-js";

interface TransitionProps {
  isOpen: boolean;
  children: JSXElement;
}

export const ModalTransition: Component<TransitionProps> = (props) => {
  const child = children(() => props.children);

  const menuEnter = (node: Element): void => {
    if (props.isOpen) {
      animate(node, { opacity: 1 }, { duration: 0 });
    }
  };

  const menuExit = (node: Element): void => {
    if (!props.isOpen) {
      animate(node, { opacity: 0 }, { duration: 0, delay: 0.4 });
    }
  };

  return (
    <Transition onEnter={menuEnter} onExit={menuExit}>
      {child()}
    </Transition>
  );
};
