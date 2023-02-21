import type { Component } from "solid-js";

export interface SVGProps {
  width?: string;
  height?: string;
}

export const SpaceMission: Component<SVGProps> = (props) => {
  return (
    <svg
      viewBox="0 0 176 30"
      width={props.width}
      height={props.height}
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
    >
      <path
        id="space-mission-container"
        fill="none"
        d="M0 0h175.438v29.877H0z"
      />
      <g
        style={{ fill: "var(--logo-color, #f8f8f8)" }}
        id="space"
        fill-rule="nonzero"
      >
        <path d="M13.769 13.722c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h-1.442c.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442H3.674a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443H2.232a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h2.884c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h5.769a6.353 6.353 0 0 1-.145-1.442c0-.577.049-1.057.145-1.442a6.353 6.353 0 0 1-.145-1.442c0-.577.049-1.057.145-1.442H3.674a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442H2.232a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442h1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h8.653c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h1.442c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443h-2.884a6.369 6.369 0 0 1-.145-1.443c0-.576.049-1.057.145-1.442H5.116c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h7.211c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442Z" />
        <path d="M28.334 15.164c0 .553-.048 1.034-.144 1.442h-1.442c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h-1.442c.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-5.769c.096.384.145.865.145 1.442a6.36 6.36 0 0 1-.145 1.442c.096.384.145.865.145 1.442a6.36 6.36 0 0 1-.145 1.442h-2.884a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h2.884c.096.384.145.865.145 1.442a6.36 6.36 0 0 1-.145 1.442h1.442c.097.384.145.865.145 1.442 0 .553-.048 1.033-.145 1.442h-1.442c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442h4.327a6.297 6.297 0 0 1-.145-1.442c0-.577.048-1.057.145-1.442h1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-1.442a6.303 6.303 0 0 1-.145-1.442c0-.577.048-1.058.145-1.442h-2.885a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h4.327c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442c.096.385.144.865.144 1.442Z" />
        <path d="M42.611 19.49c.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-2.884a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h-1.442a6.353 6.353 0 0 1-.145-1.442c0-.577.049-1.057.145-1.442h-4.327c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442h4.327c.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-5.769a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h5.769a6.36 6.36 0 0 1-.145-1.442c0-.577.049-1.058.145-1.442h-5.048a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h6.49c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h1.442Z" />
        <path d="M57.032 16.606c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442H55.59c.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-7.211a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h7.211c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h-2.884a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h-4.327c.097.384.145.865.145 1.442 0 .553-.048 1.033-.145 1.442h-1.442c.097.385.145.865.145 1.442 0 .553-.048 1.034-.145 1.442h1.442c.097.385.145.865.145 1.442 0 .553-.048 1.034-.145 1.442h4.327a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h2.884Z" />
        <path d="M71.597 12.28c0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h-7.571c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h6.129c.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442H62.8a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h-1.802a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-1.082a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h1.082a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442H62.8a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h7.211c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442c.096.384.144.865.144 1.442Zm-3.028 1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h-4.687c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h4.687Z" />
      </g>
      <g
        style={{ fill: "var(--logo-color, #f8f8f8)" }}
        id="mission"
        fill-rule="nonzero"
      >
        <path d="M86.733 5.069c.096.385.145.866.145 1.442 0 .553-.049 1.034-.145 1.443.096.384.145.865.145 1.442a6.36 6.36 0 0 1-.145 1.442c.096.384.145.865.145 1.442a6.36 6.36 0 0 1-.145 1.442c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442.096.385.145.866.145 1.443 0 .552-.049 1.033-.145 1.442h-2.884a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h-1.081c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h-.721c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h-2.164a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-.721a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h-1.081c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-2.884a6.309 6.309 0 0 1-.145-1.442c0-.577.048-1.058.145-1.443a6.297 6.297 0 0 1-.145-1.442c0-.577.048-1.057.145-1.442a6.297 6.297 0 0 1-.145-1.442c0-.577.048-1.057.145-1.442a6.303 6.303 0 0 1-.145-1.442c0-.577.048-1.058.145-1.442a6.303 6.303 0 0 1-.145-1.442c0-.577.048-1.058.145-1.442a6.312 6.312 0 0 1-.145-1.443c0-.576.048-1.057.145-1.442a6.297 6.297 0 0 1-.145-1.442c0-.577.048-1.057.145-1.442h3.605c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h1.081c.096.385.145.866.145 1.442 0 .553-.049 1.034-.145 1.443h.541c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.082a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h.541a6.312 6.312 0 0 1-.145-1.443c0-.576.048-1.057.145-1.442h1.081a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h3.605c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442Z" />
        <path d="M98.991 19.49c.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-7.21a6.366 6.366 0 0 1-.145-1.442c0-.577.049-1.058.145-1.443h2.163a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442h-2.163a6.353 6.353 0 0 1-.145-1.442c0-.577.049-1.057.145-1.442h7.21c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h-2.163c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h2.163Z" />
        <path d="M115.575 13.722c.097.385.145.865.145 1.442 0 .553-.048 1.034-.145 1.442.097.385.145.865.145 1.442 0 .553-.048 1.034-.145 1.442h-1.442c.096.385.145.866.145 1.443 0 .552-.049 1.033-.145 1.442h-8.652a6.366 6.366 0 0 1-.145-1.442c0-.577.049-1.058.145-1.443h-1.442a6.297 6.297 0 0 1-.145-1.442c0-.577.048-1.057.145-1.442h2.884c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h5.768a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-7.21a6.36 6.36 0 0 1-.145-1.442c0-.577.049-1.058.145-1.442h-1.442a6.303 6.303 0 0 1-.145-1.442c0-.577.048-1.058.145-1.442a6.312 6.312 0 0 1-.145-1.443c0-.576.048-1.057.145-1.442h1.442a6.353 6.353 0 0 1-.145-1.442c0-.577.049-1.057.145-1.442h8.652c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442h1.442c.097.385.145.866.145 1.442 0 .553-.048 1.034-.145 1.443h-2.884a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442h-5.768c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h7.21c.096.384.145.865.145 1.442a6.36 6.36 0 0 1-.145 1.442h1.442Z" />
        <path d="M129.996 13.722c.097.385.145.865.145 1.442 0 .553-.048 1.034-.145 1.442.097.385.145.865.145 1.442 0 .553-.048 1.034-.145 1.442h-1.442c.096.385.145.866.145 1.443 0 .552-.049 1.033-.145 1.442h-8.652a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h-1.442a6.297 6.297 0 0 1-.145-1.442c0-.577.048-1.057.145-1.442h2.884c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h5.768a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-7.21a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h-1.442a6.303 6.303 0 0 1-.145-1.442c0-.577.048-1.058.145-1.442a6.312 6.312 0 0 1-.145-1.443c0-.576.048-1.057.145-1.442h1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h8.652c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442h1.442c.097.385.145.866.145 1.442 0 .553-.048 1.034-.145 1.443h-2.884a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442h-5.768c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h7.21c.096.384.145.865.145 1.442a6.36 6.36 0 0 1-.145 1.442h1.442Z" />
        <path d="M142.254 19.49c.096.385.145.866.145 1.443 0 .552-.049 1.033-.145 1.442h-7.21a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h2.163a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442h-2.163a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h7.21c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442h-2.163c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h2.163Z" />
        <path d="M158.839 10.838c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h-1.082c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h-1.803c.096.385.145.866.145 1.443 0 .552-.049 1.033-.145 1.442h-5.768a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h-1.803a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-1.081a6.353 6.353 0 0 1-.145-1.442c0-.577.049-1.057.145-1.442a6.36 6.36 0 0 1-.145-1.442c0-.577.049-1.058.145-1.442a6.36 6.36 0 0 1-.145-1.442c0-.577.049-1.058.145-1.442h1.081a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442h1.803a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h5.768c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442h1.803c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443h1.082c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442Zm-2.885 5.768a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h-1.081a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442h-3.606c.097.385.145.866.145 1.442 0 .553-.048 1.034-.145 1.443h-1.081c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h1.081c.097.385.145.865.145 1.442 0 .553-.048 1.034-.145 1.442h3.606a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h1.081Z" />
        <path d="M173.26 5.069c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-2.885a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h-1.802a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-1.082a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h-1.442c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-2.884a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h3.605c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h1.082c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443h1.081c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h2.885c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442Z" />
      </g>
    </svg>
  );
};