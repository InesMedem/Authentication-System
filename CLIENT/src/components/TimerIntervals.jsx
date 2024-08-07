// import { useEffect, useState } from "react";

// const TimerIntervals = () => {
//   const [seconds, setSeconds] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSeconds((prevSeconds) => prevSeconds + 1);
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Timer</h1>
//       <p>Seconds elapsed: {seconds}</p>
//     </div>
//   );
// };
// export default TimerIntervals;
