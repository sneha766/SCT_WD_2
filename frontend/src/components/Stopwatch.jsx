import React, { useState, useRef, useEffect } from 'react';
import './Stopwatch.css'; // Make sure this file exists

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const formatTime = (ms) => {
    const milliseconds = ms % 1000;
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / 60000) % 60;
    const hours = Math.floor(ms / 3600000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  };

  const handleStartPause = () => setRunning(!running);
  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };
  const handleLap = () => {
    if (running) {
      setLaps(prev => [formatTime(time), ...prev]);
    }
  };

  return (
    <div className="stopwatch-container">
      <h1>⏱️ Stopwatch</h1>
      <div className="display">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={handleStartPause}>{running ? 'Pause' : 'Start'}</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleLap}>Lap</button>
      </div>
      <ul className="laps">
        {laps.map((lap, index) => (
          <li key={index}>Lap {laps.length - index}: {lap}</li>
        ))}
      </ul>
    </div>
  );
}
