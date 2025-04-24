import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  /** NOTE on React.StrictMode
   *
   * Double invokes useEffect in Dev environments.
   * so for every subsequent Re-mount it 1st mounts, 2nd dismounts,
   * then finally mounts back again.
   * When we mount OUTPUT -> Mounted, Unmounted, Mounted
   * When we unmount OUTPUT -> Unmounted
   * When we mount again OUTPUT -> Mounted, Unmounted, Mounted
   * When we unmount again OUTPUT -> Unmounted
   *
   * In Production Mode Single Invoke occurs without double checking by StrictMode.
   */

  // Non parameterised useEffect, for component lifecycle events like Mount and Unmount
  useEffect(function startWatch() {
    console.info("Mounted");
    const clock = setInterval(() => {
      setSeconds(function incrementSecond(c) {
        return c + 1;
        // best practice is not to directly use setMethod(oldValue+1)
        // instead pass a callback that returns a random param and returns modified
        // param. The Operation performed/returned with param will be performed on the
        // state var.
      });
    }, 1000);

    // Manual cleanup by returning a function from useEffect, when component is unmounted
    // automatically clock is cleared, else it exists even if clock is not present
    // in Document.
    // APP NEVER UNMOUNTS, SO STATE VAR PERSISTS !
    return function () {
      console.info("Unmounted");
      clearInterval(clock);
    };
  }, []);

  return (
    <div>
      <b>Counter App</b>
      <h3>{count}</h3>
      <Counter count={count} setCount={setCount}></Counter>
      {parseInt(count) % 2 === 0 ? (
        <Stopwatch seconds={seconds}></Stopwatch>
      ) : null}
    </div>
  );
}

const Counter = (props) => {
  const increaseCount = () => {
    props.setCount(props.count + 1);
  };
  const decreaseCount = () => {
    props.setCount(props.count - 1);
  };
  const resetCount = () => {
    props.setCount(0);
  };

  return (
    <div>
      <button onClick={increaseCount}>Increase count</button>
      <button onClick={decreaseCount}>Decrease count</button>
      <button onClick={resetCount}>Reset count</button>
    </div>
  );
};

const Stopwatch = (props) => {
  return (
    <div>
      <h1>Stopwatch Running at {props.seconds} seconds.</h1>
    </div>
  );
};

export default App;
