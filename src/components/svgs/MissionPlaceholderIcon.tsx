import type { Component } from "solid-js";

import { SVGProps } from "./SpaceMission";

export const MissionPlaceholderIcon: Component<SVGProps> = (props) => {
  return (
    <svg
      viewBox="0 0 57 209"
      width={props.width}
      height={props.height}
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
    >
      <path id="Artboard1" fill="none" d="M0 0h56.685v208.464H0z" />
      <path
        fill="var(--accent-teal)"
        d="M14.119 145.403c-2.336-14.782-12.467-81.36-9.015-102.996 2.454-15.373 23.36-40.442 23.36-40.442s20.905 25.069 23.359 40.442c3.453 21.636-6.679 88.214-9.015 102.996 7.679 4.796 12.79 13.322 12.79 23.033 0 2.878-.449 5.652-1.28 8.255-3.497-10.315-13.757-17.791-25.854-17.791-12.098 0-22.357 7.476-25.854 17.791a27.071 27.071 0 0 1-1.281-8.255c0-9.711 5.112-18.237 12.79-23.033Z"
      />
      <path
        fill="var(--accent-teal)"
        d="M28.464 205.924s11.073-23.255 11.073-33.222c0-6.111-4.962-11.073-11.073-11.073-6.112 0-11.074 4.962-11.074 11.073 0 9.967 11.074 33.222 11.074 33.222Zm0-18.258s5.487-11.524 5.487-16.463a5.49 5.49 0 0 0-5.487-5.488 5.49 5.49 0 0 0-5.488 5.488c0 4.939 5.488 16.463 5.488 16.463Z"
      />
    </svg>
  );
};
