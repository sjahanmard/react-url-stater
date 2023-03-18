import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useURLContext } from "./instantiate";
import { useURLState } from "./use_url_state";

function App() {
  const [state, setState] = useURLState({
    counter: 0,
  });
  const [context, setContext] = useURLContext();

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setState((prev) => ({
              counter: Number(prev?.counter || 0) + 1,
            }));
          }}
        >
          count is {context?.counter}
        </button>
        <button
          onClick={() => {
            setContext((prev) => ({
              ...prev,
              counter: Number(prev?.counter || 0) + 1,
            }));
          }}
        >
          click me too {state?.counter}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;