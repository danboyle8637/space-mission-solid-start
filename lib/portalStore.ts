import { createSignal } from "solid-js";

export const [isOverlayOpen, setIsOverlayOpen] = createSignal<boolean>(false);

export const toggleIsOverlayOpen = () => {
  setIsOverlayOpen((prevValue) => !prevValue);
};

export const closeIsOverlayOpen = () => {
  setIsOverlayOpen(() => false);
};
