import {} from "solid-js";
import { createRouteAction } from "solid-start";
import { styled } from "solid-styled-components";
import type { Component } from "solid-js";

import { ImageUploadInput } from "../../components/forms/ImageUploadInput";
import { FormButton } from "../../components/buttons/FormButton";
import { updateUser } from "../../../lib/userStore";
import type { UserDoc } from "../../types";

const Container = styled("div")`
  padding-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 40px;
  justify-items: center;
  width: 300px;
`;

const ButtonContainer = styled("div")`
  width: 260px;
`;

export const ImageUploadForm: Component = () => {
  const [_, { Form }] = createRouteAction(async (formData: FormData) => {
    const avatarImage = formData.get("avatarImage");

    console.log(avatarImage);

    // Hit Cloudflare

    // if (email) {
    //   const user: UserDoc = {
    //     userId: "123456",
    //     activeMission: "",
    //     callsign: "Maverick",
    //     avatar: "",
    //     emailAddress: email as string,
    //     finishedMissions: [],
    //   };

    //   updateUser(user);
    // }
  });

  return (
    <Form>
      <Container>
        <ImageUploadInput />
        <ButtonContainer>
          <FormButton isValid={true}>Save Space Avatar</FormButton>
        </ButtonContainer>
      </Container>
    </Form>
  );
};
