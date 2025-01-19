import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

export default function FocusTimer() {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && time > 0) {
      interval = window.setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const reset = () => {
    setTime(25 * 60);
    setIsActive(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Focus Timer</h2>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-6">
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`p-3 rounded-full ${
              isActive ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
            }`}
            title={isActive ? 'Pause' : 'Play'}
          >
            {isActive ? <Pause size={20} /> : <Play size={20} />}
          <button
            onClick={reset}
            className="p-3 rounded-full bg-gray-100 text-gray-600"
            title="Reset"
          >
            <RefreshCw size={20} />
          </button>
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Stay focused for 25 minutes, then take a 5-minute break
        </p>
      </div>
    </div>
  );
}