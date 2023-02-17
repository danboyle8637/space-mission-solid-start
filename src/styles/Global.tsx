import { createGlobalStyles } from "solid-styled-components";

export const GlobalStyles = () => {
  const Styles: () => null = createGlobalStyles`
    :root {
      --base-blue: #1A1A2E;
      --dark-blue: #0F0F1A;
      --accent-pink: #B983FF;
      --accent-purple: #94B3FD;
      --accent-blue: #94DAFF;
      --accent-teal: #99FEFF;
    }

    html {
      box-sizing: border-box;
      font-size: 62.5%;
      -webkit-tap-highlight-color: transparent;
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }

    body {
      margin: 0;
      padding: 0;
      background: var(--body-background, var(--base-blue));
      width: 100%;
    }

    section {
      margin: 0;
      padding: 0;
    }

    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: unset;
      line-height: 1;
    }

    p {
      margin: 0;
      padding: 0;
      font-family: -apple-system, sans-serif;
    }

    li, ol {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      
    }

    a, button {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    a {
      font-size: 1.7rem;
    }

    button {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    label {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    input, textarea {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      &::placeholder {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
    }
  `;

  return <Styles />;
};
