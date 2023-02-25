import { createSignal } from "solid-js";
import type { MissionId } from "../src/types";

interface MissionOverlay {
  isOpen: boolean;
  mission: MissionId;
}

export const [isMissionOverlayOpen, setIsMissionOverlayOpen] =
  createSignal<MissionOverlay>({
    isOpen: false,
    mission: "mars",
  });

export const toggleIsMissionOverlayOpen = (mission: MissionId) => {
  setIsMissionOverlayOpen((prevValue) => ({
    isOpen: !prevValue.isOpen,
    mission: mission,
  }));
};

export const closeIsOverlayOpen = () => {
  setIsMissionOverlayOpen(() => ({
    isOpen: false,
    mission: "mars",
  }));
};

export const [isImageUploadOpen, setIsImageUploadOpen] =
  createSignal<boolean>(false);

export const toggleIsImageUploadOpen = () => {
  setIsImageUploadOpen((prevValue) => !prevValue);
};
