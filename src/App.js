import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  function startTimer() {
    setIsRunning(true);
  }

  function pauseTimer() {
    setIsRunning(false);
  }

  function resetTimer() {
    setIsRunning(false);
    setSeconds(0);
  }


  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);


  return (
    <div className="App">
      <header>react-timer</header>
      <main>
        <div className="timer">
          <p>{seconds} seconds</p>
        </div>
        <button id="start" onClick={startTimer}>Start</button>
        <button id="stop" onClick={pauseTimer}>Pause</button>
        <button it="reset" onClick={resetTimer}>Reset</button>
      </main>
    </div>
  );
}

export default App;
