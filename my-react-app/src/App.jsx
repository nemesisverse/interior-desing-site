import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles.css";
import Footer from "./components/Footer.jsx"; // ✅ Correct import

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ul>
        <h1 contentEditable>
          My name is PAl
        </h1>
      </ul>

      {/* ✅ Footer should be outside of <h1> */}
      <Footer />  
    </div>
  );
}

export default App;
