import './App.css';
import { useState, useEffect } from 'react';
import alarm from  './alarm.wav'

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
  
  function secsToMins(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    let padding = (secs < 10) ? "0" : "";
    return `${mins}:${padding}${secs}`
  }


  useEffect(() => {
    let interval = null;
    console.log()
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds > 0) {
          return seconds - 1
          } else if (seconds == 1) {
            let sound = new Audio(alarm);
            sound.play();
          }
          clearInterval(interval);
          return 0;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  function handleSubmit(e) {
    e.preventDefault();
    setSeconds(e.target.minutes.value * 60);
    startTimer();
  }


  return (
    <div className="App">
      <header>react-timer</header>
      <main>
        <div className="timer">
          <p>{secsToMins(seconds)}</p>
        </div>
        <button id="start" onClick={startTimer}>Start</button>
        <button id="stop" onClick={pauseTimer}>Pause</button>
        <button id="reset" onClick={resetTimer}>Reset</button>
        <form onSubmit={handleSubmit}>
          <input name="minutes" type="number" placeholder="5"></input> minute(s)
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default App;


