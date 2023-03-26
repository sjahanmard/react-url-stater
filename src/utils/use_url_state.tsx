import { useEffect, useState } from "react";
import { Callback, ReturnUseURLState } from "../types";
import { getQuery } from "./get_query";
import { jsonParse } from "./json_parse";

export function useURLStateBasic<T = {}>(
  defaultState: T
): ReturnUseURLState<T> {
  const [state, setState] = useState<T>(defaultState);
  const query = getQuery("state");
  useEffect(() => {
    (function updateStateFromQueryParams() {
      try {
        const newState = jsonParse<T>(query);
        setState(newState);
      } catch {
        // do nothing
      }
    })();
  }, []);

  function updateState(callback: (prevState: T) => T, replace: boolean) {
    const newState = callback(state);

    if (Object.is(newState, state)) {
      return;
    }
    const { newUrl, newStateData } = formatData(newState);

    const historyFunction = replace
      ? window.history.replaceState
      : window.history.pushState;
    historyFunction.apply(window.history, [{}, "", newUrl?.href]);
    setState(newStateData);
  }

  function push(callback: Callback<T>) {
    updateState(callback, false);
  }

  function replace(callback: Callback<T>) {
    updateState(callback, true);
  }

  function formatData(newData: T) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("state", JSON.stringify(newData));
    return { newUrl, newStateData: newData };
  }

  return [state, push, replace];
}
