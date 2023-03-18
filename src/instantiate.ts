import { RouterState } from "./context";

export const myRouterState = new RouterState({
  backgroundColor: "blue",
  counter: 0,
});

export const Provider = myRouterState?.Provider;
export const useURLContext = myRouterState.useURLContext;
