import { Component } from "solid-js";

interface ImageProps {
  imageUrl: string;
  altTag: string;
  titleTag: string;
}

export const MissionBannerImage: Component<ImageProps> = (props) => {
  return (
    <img
      style={{ width: "100%" }}
      src={props.imageUrl}
      width={600}
      height={300}
      alt={props.altTag}
      title={props.titleTag}
    />
  );
};
