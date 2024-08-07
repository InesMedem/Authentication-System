import { useEffect, useState } from "react";

const Counter = () => {
  //   const [count, setCount] = useState(0);
  // Initialize state with a function to read from localStorage

  const [count, setCount] = useState(() => {
    // Retrieve the count from localStorage or default to 0 if not present

    const savedCount = localStorage.getItem("count");
    return savedCount !== null ? JSON.parse(savedCount) : 0;
  });

  // Use useEffect to update localStorage whenever count changes
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  return (
    <div className=" form">
      <h4>counter</h4>
      <p>
        <b>Objective:</b> Learn the basics of state and event handling.
      </p>
      <h4>{count}</h4>
      <label></label>
      <button className="btn-block" onClick={() => setCount(count + 1)}>
        Increase
      </button>
      <label></label>

      <button className="btn-block" onClick={() => setCount(count - 1)}>
        Decrease
      </button>
      <label></label>

      <button
        className="danger-btn btn-block"
        onClick={() => {
          setCount(0);
          localStorage.removeItem("count");
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
