import { useCallback, useEffect, useState } from "react";
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
        if (Object?.keys?.(newState)?.length !== 0) setState(newState);
      } catch {
        // do nothing
      }
    })();
  }, []);
  const updateState = useCallback(
    function (callback: (prevState: T) => T, replace: boolean) {
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
    },
    [state]
  );

  const replace = useCallback(
    function (callback: Callback<T>) {
      updateState(callback, false);
    },
    [updateState]
  );
  const push = useCallback(
    function (callback: Callback<T>) {
      updateState(callback, false);
    },
    [updateState]
  );

  const formatData = useCallback(function (newData: T) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("state", JSON.stringify(newData));
    return { newUrl, newStateData: newData };
  }, []);

  return [state, push, replace];
}
