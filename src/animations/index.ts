import { animate, spring, timeline } from "motion";

const draw = (progress: number) => ({
  // This property makes the line "draw" in when animated
  strokeDashoffset: 1 - progress,

  // Each line will be hidden until it starts drawing
  // to fix a bug in Safari where the line can be
  // partially visible even when progress is at 0
  visibility: "visible",
});

export const drawCircleGraph = (
  path: SVGPathElement,
  value: number,
  duration: number,
  kill: boolean
) => {
  const valueLevel = value / 10;

  const ani = animate(path, draw(valueLevel), {
    duration: duration,
    easing: "linear",
  });

  if (kill) {
    ani.cancel();
  } else {
    ani.play();
  }
};

export const checkmarkOn = (checkPath: SVGPathElement, kill?: boolean) => {
  const check = animate(checkPath, draw(1), {
    duration: 0.4,
    easing: spring(),
  });

  if (kill) {
    check.cancel();
  } else {
    check.play();
  }
};

export const checkmarkOff = (checkPath: SVGPathElement, kill?: boolean) => {
  const check = animate(checkPath, draw(0), {
    duration: 0.4,
    easing: spring(),
  });

  if (kill) {
    check.cancel();
  } else {
    check.play();
  }
};

export const clickLayerOn = (layer: HTMLDivElement) => {
  animate(layer, { opacity: 1 }, { duration: 0.3, easing: "ease-in-out" });
};

export const clickLayerOff = (layer: HTMLDivElement) => {
  animate(layer, { opacity: 0 }, { duration: 0.3, easing: "ease-in-out" });
};

export const missionDetailsOpen = (card: HTMLDivElement) => {
  animate(
    card,
    { x: "-50%", y: "-50%", scale: 1, opacity: 1 },
    { duration: 0.4, easing: spring(), delay: 0.4 }
  );
};

export const missionDetailsClosed = (card: HTMLDivElement) => {
  animate(
    card,
    { x: "-50%", y: "-60%", scale: 0.9, opacity: 0 },
    { duration: 0.4, easing: spring() }
  );
};

export const loginFormOnLoad = (form: HTMLDivElement) => {
  animate(
    form,
    { y: 0, scale: 1, opacity: 1 },
    { duration: 0.8, easing: "ease-in-out" }
  );
};

export const overlayCloseButtonAni = (
  leftCross: HTMLDivElement,
  rightCross: HTMLDivElement
) => {
  const sequence: any = [
    [
      leftCross,
      { transform: "rotate(-45deg)", opacity: 1 },
      { duration: 0.3, easing: spring() },
    ],
    [
      rightCross,
      { transform: "rotate(45deg)", opacity: 1 },
      { duration: 0.3, easing: spring() },
    ],
  ];

  timeline(sequence, { duration: 0.6, delay: 0.8 });
};