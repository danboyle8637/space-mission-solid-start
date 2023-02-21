import { createSignal } from "solid-js";

interface ErrorState {
  isErrorToasterOpen: boolean;
  errorHeadline: string;
  errorMessage: string;
}

export const [errorState, setErrorState] = createSignal<ErrorState>({
  isErrorToasterOpen: false,
  errorHeadline: "",
  errorMessage: "",
});

export const updateErrorMessage = (headline: string, message: string) => {
  setErrorState((prevValue) => ({
    ...prevValue,
    errorHeadline: headline,
    errorMessage: message,
  }));
};

export const toggleErrorOverlay = () => {
  setErrorState((prevValue) => ({
    ...prevValue,
    isErrorToasterOpen: !prevValue.isErrorToasterOpen,
  }));
};

export const closeErrorOverlay = () => {
  setErrorState((prevValue) => ({
    ...prevValue,
    isErrorToasterOpen: false,
  }));
};
