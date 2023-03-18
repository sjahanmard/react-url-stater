import App from "./App";
import { Provider } from "./instantiate";

export function Test() {
  return (
    <Provider>
      <App />
    </Provider>
  );
}
