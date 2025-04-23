import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <b>Counter App</b>
      <h3>{count}</h3>
      <Counter count={count} setCount={setCount}></Counter>
      {parseInt(count) % 2 === 0 ? <Stopwatch></Stopwatch> : null}
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

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(function startWatch() {
    alert("Mounted");
    const clock = setInterval(() => {
      setSeconds(function incrementSecond(seconds) {
        return seconds + 1;
      });
    }, 1000);

    // Manual cleanup by returning a function from useEffect, when component is unmounted
    // automatically clock is cleared, else it exists even if clock is not present
    // in Document.
    return function () {
      alert("Unmounted");
      clearInterval(clock);
    };
  }, []);

  return (
    <div>
      <h1>Stopwatch Running at {seconds} seconds.</h1>
    </div>
  );
};

export default App;
