import { createSignal, createEffect, createMemo, onCleanup } from "solid-js";
import { styled } from "solid-styled-components";
import type { Component, JSX } from "solid-js";

import { ImageUploadIcon } from "../svgs/ImageUploadIcon";

const ImageInputContainer = styled("div")`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 300px;
  isolation: isolate;
  overflow: hidden;
`;

const ImageInput = styled("input")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
`;

const ContentContainer = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 20px;
  justify-items: center;
  width: 100%;
`;

const UploadIcon = styled("div")`
  width: 140px;
`;

const LabelContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 12px;
  justify-items: center;
  width: 100%;
`;

const Label = styled("p")`
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--accent-purple);
`;

const ImagePreview = styled("img")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  border-radius: 12px;
  width: 200px;
  height: 200px;
  object-fit: cover;
  visibility: var(--image-preview-visibility, hidden);
`;

export const ImageUploadInput: Component = (props) => {
  const [showAvatarPreview, setShowAvatarPreview] =
    createSignal<boolean>(false);

  const updateShowAvatarPreview = (state: boolean) => {
    setShowAvatarPreview(state);
  };

  let inputRef: HTMLInputElement;
  let imageRef: HTMLImageElement;

  onCleanup(() => {
    updateShowAvatarPreview(false);
  });

  const handleDragEnter = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDragOver = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const data = event.dataTransfer;

    if (!data) {
      return;
    }

    const file: FileList = data.files;
    // props.updateAvatarFileList(file);
    updateShowAvatarPreview(true);
    handleFiles(file);
  };

  const handlePhotoSelect = (e: InputEvent) => {
    e.preventDefault();
    updateShowAvatarPreview(false);
    imageRef.src = "";

    const inputElement = e.currentTarget as HTMLInputElement;
    const data = inputElement.files;
    const file: FileList = data!;

    if (file.length > 0) {
      // props.updateAvatarFileList(file);
      updateShowAvatarPreview(true);
      handleFiles(file);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target) {
        imageRef.src = e.target?.result as string;
      }
    };

    if (fileList) {
      reader.readAsDataURL(fileList[0]);
    }
    return;
  };

  const styles = createMemo(
    () =>
      ({
        "--image-preview-visibility": showAvatarPreview() ? "show" : "hidden",
      } as JSX.CSSProperties)
  );

  return (
    <ImageInputContainer style={styles()}>
      <ImagePreview ref={imageRef!} src="" alt="Image Preview" />
      <ImageInput
        ref={inputRef!}
        id="avatarImage"
        name="avatarImage"
        type="file"
        accept="image/*"
        onInput={handlePhotoSelect}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
      {showAvatarPreview() ? null : (
        <ContentContainer>
          <UploadIcon>
            <ImageUploadIcon />
          </UploadIcon>
          <LabelContainer>
            <Label>Click the Camera</Label>
            <Label>Or...</Label>
            <Label>Drag & Drop Image</Label>
          </LabelContainer>
        </ContentContainer>
      )}
    </ImageInputContainer>
  );
};
