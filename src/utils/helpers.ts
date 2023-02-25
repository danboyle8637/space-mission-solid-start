export const capitalizeName = (name: string) => {
  const nameArray = name.split("");
  const firstChar = nameArray.shift()?.toUpperCase();

  if (firstChar) {
    nameArray.unshift(firstChar);
    const cappedName = nameArray.join("");

    return cappedName;
  } else {
    return "";
  }
};

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const toggleScrollingOnOverlay = (isOpen: boolean) => {
  if (window && document && isOpen) {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}`;
  }

  if (window && document && !isOpen) {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
  }
};
