import { Context, createContext, useContext } from "react";
import { InitialValue, ReturnUseURLState } from "../types";
import { useURLState } from "./use_url_state";

export class RouterState<T> {
  state: InitialValue<T> = {} as InitialValue<T>;
  context: Context<ReturnUseURLState<InitialValue<T>>>;

  constructor(initialValue: InitialValue<T>) {
    this.state = initialValue;
    this.context = createContext<ReturnUseURLState<InitialValue<T>>>(
      [] as unknown as ReturnUseURLState<InitialValue<T>>
    );
  }
  Provider: (props: any) => JSX.Element = (props: any) => {
    const res = useURLState(this?.state);
    return <this.context.Provider value={res} {...props} />;
  };
  useURLContext = () => {
    return useContext<ReturnUseURLState<InitialValue<T>>>(this.context);
  };
}
