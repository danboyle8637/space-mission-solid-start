import { styled } from "solid-styled-components";

import { SpaceMissionHelmet } from "../images/SpaceMissionHelmet";

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
`;

// TODO - toggle overlay to update the avatar for the astronaught
export const AvatarButton = () => {

  // TODO - Create an image input you can toss in the modal
  const handleChangeAvatar = () => {
    console.log("Overly image input and use Cloudflare workers to update image")
  }

  return (
    <Button type="button" aria-label="Avatar Image Button" onClick={handleChangeAvatar}>
      <SpaceMissionHelmet />
    </Button>
  );
};
