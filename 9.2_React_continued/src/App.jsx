import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <b>Counter App</b>
      <h3>{count}</h3>
      <Counter count={count} setCount={setCount}></Counter>
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

export default App;
