import "./App.css";
import { useState } from "react";

function App() {
  return (
    <>
      <h1>たっけです！</h1>
      <h1>TSとReactの知識が少ないですが一生懸命頑張ります!</h1>
      <LikeButton />
    </>
  );
}


function LikeButton() {
  const [count, setCount] = useState(999);
  const handleClick = () => {
    setCount(count + 1);
  };
  return <span className="likeButton" onClick={handleClick}>♥ {count}</span>;
}

export default App;