import "./App.css";
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Button count={count} setCount={setCount}></Button>
    </main>
  );
}

const Button = (props) => {
  const increaseCount = () => {
    props.setCount(props.count + 1);
  };
  
  return (
    <button onClick={increaseCount}>Count {props.count}</button>
  )
};
