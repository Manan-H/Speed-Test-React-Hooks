import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const Timer = props => {
  const { timerOn, resetTimer } = props;

  const [timerTime, setTimerTime] = useState(0);
  const [timerStart, setTimerStart] = useState(0);

  const seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
  const minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
  const hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
  const timer = useRef();
  const startTimer = useRef();

  startTimer.current = () => {
    setTimerStart(Date.now() - timerTime);
  };

  useEffect(() => {
    if (timerOn) {
      startTimer.current();
    }
    if (!timerOn) {
      clearInterval(timer.current);
    }
  }, [timerOn, startTimer]);

  useEffect(() => {
    clearInterval(timer.current);
    setTimerStart(0);
    setTimerTime(0);
  }, [resetTimer]);

  useEffect(() => {
    if (timerStart && timerOn) {
      timer.current = setInterval(() => {
        setTimerTime(Date.now() - timerStart);
      }, 10);
    }
    return () => clearInterval(timer.current);
  }, [timerStart, timerOn]);

  return (
    <div>
      {hours} : {minutes} : {seconds}
    </div>
  );
};

export default Timer;
