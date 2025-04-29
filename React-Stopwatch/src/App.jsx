import { useEffect } from "react";
import { useState } from "react";

const Stopwatch = (props) => {
  const [count, setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    // Function called on Mount, irrespective of isCounting
    if (!isCounting) return;

    const generateRandomColor = (colorIndex) => {
      const brightOnDarkColors = [
        "#FF6F61", // Coral Red (kept as first color)
        "#4CAFFF", // Bright Sky Blue
        "#FFD700", // Vivid Gold
        "#FF00A0", // Vivid Fuchsia (replacing Bright Red)
        "#32CD32", // Bright Lime Green
        "#B84CFF", // Electric Purple
        "#FF69B4", // Hot Pink
        "#00CED1", // Dark Turquoise (Bright Aqua)
        "#FFA500", // Pure Orange
        "#FF1493", // Deep Pink
        "#00BFFF", // Deep Sky Blue
        "#40E0D0", // Turquoise
        "#FF4500", // Orange Red (new color to replace duplicate Dark Orange)
        "#ADFF2F", // Green Yellow
        "#FF00FF", // Magenta
        "#FF6347", // Bright Red
      ];

      const color = brightOnDarkColors[colorIndex];

      return color;
    };

    const clock = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      const nextColorIndex = (colorIndex + 1) % 16;
      // Even if colorIndex was 15, (colorIndex + 1) % 16 will give you 0, and it will
      // correctly loop to the first color, thus ensuring no "black" or unexpected result.
      /** By using %, you prevent getting black (or any invalid colors) when working with
       *  state in Asynchronous code.
       *  This ensures smooth cycling through the colors without any unexpected behavior. */
      props.setWatchColor(generateRandomColor(nextColorIndex));
      setColorIndex(nextColorIndex);
      /** Since setColorIndex is asynchronous, the colorIndex I was using in prev code,
       * i.e:- generateRandomColor(colorIndex) could be the outdated value from the
       * previous cycle, especially since I am trying to increment the colorIndex
       * during each interval. Prevented by using Modulo % Operator */
    }, 200);

    /** Cleanup of old clock, called verytime before Component 
        Remount (or during Dismount) in case isCounting changes **/
    return () => {
      clearInterval(clock);
    };
  }, [isCounting, colorIndex]);
  /** Both of the above dependencies change when clock starts,
   ** values persist as they are global state variables and cleanup is only
   ** deleting old clock from memory, not the values of these state vars. */

  // to debug
  console.log(isCounting, colorIndex);

  const toggle = () => {
    setIsCounting((isC) => !isC);
  };

  const reset = () => {
    setCount(0);
    setIsCounting(false);
  };

  return (
    <div>
      <button onClick={toggle}>{isCounting ? "Stop" : "Play"}</button>
      <button onClick={reset}>Reset</button>
      <h1 style={{ color: props.watchColor, backgroundColor: "#3B3B3B" }}>
        {count}
      </h1>
    </div>
  );
};

function App() {
  const [watchColor, setWatchColor] = useState("white");

  return (
    <div>
      <Stopwatch
        watchColor={watchColor}
        setWatchColor={setWatchColor}
      ></Stopwatch>
    </div>
  );
}
export default App;
