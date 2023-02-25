import { Portal } from "solid-js/web";
import { styled } from "solid-styled-components";

import { SpaceMissionHelmet } from "../images/SpaceMissionHelmet";
import { ImageUploadForm } from "../../views/Dashboard/ImageUploadForm";
import { MissionDetailsModal } from "../overlays/MissionDetailsModal";
import {
  isImageUploadOpen,
  toggleIsImageUploadOpen,
} from "../../../lib/portalStore";

const Button = styled.button`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--accent-purple);
  border-radius: 50%;
  border: none;
  width: 60px;
  height: 60px;
  outline: none;
  cursor: pointer;
  box-shadow: 0 0 0 4px hsla(0, 0%, 0%, 0.4);
  transition: box-shadow, background-color, 300ms ease-in-out;

  &:focus {
    background-color: var(--accent-teal);
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
  &:hover {
    background-color: var(--accent-teal);
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
`;

// TODO - toggle overlay to update the avatar for the astronaught
export const AvatarButton = () => {
  // TODO - Create an image input you can toss in the modal
  const handleChangeAvatar = () => {
    console.log(
      "Overly image input and use Cloudflare workers to update image"
    );
    toggleIsImageUploadOpen();
  };

  const updateAvatarFileList = (fileList: FileList) => {
    // console.log(fileList[0]);
  };

  return (
    <>
      <Button
        type="button"
        aria-label="Avatar Image Button"
        onClick={handleChangeAvatar}
      >
        <SpaceMissionHelmet />
      </Button>
      <Portal>
        <MissionDetailsModal
          isOpen={isImageUploadOpen()}
          closeOverlay={toggleIsImageUploadOpen}
        >
          <ImageUploadForm />
        </MissionDetailsModal>
      </Portal>
    </>
  );
};
