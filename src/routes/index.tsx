import { styled } from "solid-styled-components";
import { Title } from "solid-start";

import { BrokenHelmet } from "../components/images/BrokenHelmet";

const Logo = styled("div")`
  width: 300px;
`;

export default function Home() {
  return (
    <main>
      <Title>Hello Solid Space Mission</Title>
      <Logo>
        <BrokenHelmet />
      </Logo>
    </main>
  );
}
