import type { Component } from "solid-js";
import type { SVGProps } from "./SpaceMission";

export const ImageUploadIcon: Component<SVGProps> = (props) => {
  return (
    <svg
      viewBox="0 0 240 192"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      fill-rule="evenodd"
      clip-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
    >
      <path fill="none" d="M0 0h239.894v191.422H0z" />
      <circle
        cx="119.782"
        cy="116.574"
        r="32.065"
        fill="var(--camera-color, var(--accent-purple))"
      />
      <path
        d="M214.799 36.559h-32.313V19.863c0-9.886-8.014-17.899-17.899-17.899h-89.61c-9.886 0-17.899 8.013-17.899 17.899v16.696H24.765c-12.804 0-23.184 10.38-23.184 23.183v106.429c0 12.805 10.38 23.183 23.184 23.183h190.034c12.804 0 23.183-10.378 23.183-23.183V59.742c0-12.803-10.379-23.183-23.183-23.183Zm-95.018 25.96c29.833 0 54.053 24.22 54.053 54.055 0 29.832-24.22 54.053-54.053 54.053s-54.054-24.221-54.054-54.053c0-29.835 24.221-54.055 54.054-54.055Zm105.09 0c0 7.165-5.809 12.973-12.973 12.973-7.166 0-12.973-5.808-12.973-12.973 0-7.166 5.807-12.974 12.973-12.974 7.164 0 12.973 5.808 12.973 12.974Z"
        fill="var(--cameria-color, var(--accent-purple))"
        fill-rule="nonzero"
      />
    </svg>
  );
};
