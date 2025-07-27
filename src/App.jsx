import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div
        style={{
          width: "300px",
          height: "300px",
          backgroundColor: "lightblue",
        }}
      ></div>
      <h1></h1>
      <p></p>
      <a></a>
      <input>askjdfkhas</input>
    </>
  );
}

export default App;
