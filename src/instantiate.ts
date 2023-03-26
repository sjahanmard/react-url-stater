import { URLState } from "./utils/context";

export const myURLState = new URLState({
  backgroundColor: "blue",
  counter: 0,
});

export const Provider = myURLState?.Provider;
export const useURLState = myURLState.useURLState;
