import { createEffect, children } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSXElement } from "solid-js";

import { CloseIcon } from "../cssDrawings/CloseIcon";
import { InstantTransition } from "../../animations/InstantTransition";
import { modalEnter, modalExit } from "../../animations";

interface ModalProps {
  isOpen: boolean;
  closeOverlay: () => void;
  children: JSXElement;
}

const Dialog = styled("dialog")`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 12px;
  justify-items: end;
  background-color: var(--dark-blue);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  border-radius: 20px;
  width: fit-content;
  box-shadow: 0 4px 4px 1px hsla(0, 0%, 0%, 0.4), 0 0 0 4px var(--accent-purple);
  z-index: 2;
  overflow: hidden;
`;

const ContentContainer = styled("div")`
  position: relative;
  width: 100%;
  isolation: isolate;
`;

const CloseButton = styled("button")`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  z-index: 1;

  &:focus {
    outline-offset: 5px;
    outline-style: dashed;
    outline-width: 1px;
    outline-color: var(--light-2);
  }
`;

export const MissionDetailsModal: Component<ModalProps> = (props) => {
  const child = children(() => props.children);

  let modalRef: HTMLDialogElement;

  createEffect(() => {
    if (props.isOpen) {
      modalEnter(modalRef);
    }

    if (!props.isOpen) {
      modalExit(modalRef);
    }
  });

  return (
    <InstantTransition
    isOpen={props.isOpen}
    handleClick={props.closeOverlay}
    isMobileLayout={false}
    >
      <Dialog ref={modalRef!}>
        <CloseButton
          type="button"
          aria-label="Close button"
          onClick={props.closeOverlay}
        >
          <CloseIcon isOpen={props.isOpen} />
        </CloseButton>
        <ContentContainer>{child()}</ContentContainer>
      </Dialog>
    </InstantTransition>
  );
};
