import { mount, StartClient } from "solid-start/entry-client";
import { GlobalStyles } from "./styles/Global";

mount(
  () => (
    <>
      <GlobalStyles />
      <StartClient />
    </>
  ),
  document
);
