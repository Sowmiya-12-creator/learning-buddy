"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { TimerMode } from "@/types";
import { POMODORO_SETTINGS } from "@/constants";

const DURATIONS: Record<TimerMode, number> = {
  focus:      POMODORO_SETTINGS.focusDuration * 60,
  shortBreak: POMODORO_SETTINGS.shortBreakDuration * 60,
  longBreak:  POMODORO_SETTINGS.longBreakDuration * 60,
};

export function useTimer() {
  const [mode, setMode]               = useState<TimerMode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(DURATIONS["focus"]);
  const [isRunning, setIsRunning]     = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const intervalRef                   = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleComplete = useCallback(() => {
    clearTimer();
    setIsRunning(false);

    if (mode === "focus") {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      const nextMode =
        newCount % POMODORO_SETTINGS.sessionsUntilLong === 0 ? "longBreak" : "shortBreak";
      setMode(nextMode);
      setSecondsLeft(DURATIONS[nextMode]);
    } else {
      setMode("focus");
      setSecondsLeft(DURATIONS["focus"]);
    }
  }, [mode, sessionCount]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          handleComplete();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return clearTimer;
  }, [isRunning, handleComplete]);

  const start  = () => setIsRunning(true);
  const pause  = () => setIsRunning(false);
  const toggle = () => setIsRunning((v) => !v);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setSecondsLeft(DURATIONS[mode]);
  }, [mode]);

  const switchMode = useCallback((newMode: TimerMode) => {
    clearTimer();
    setIsRunning(false);
    setMode(newMode);
    setSecondsLeft(DURATIONS[newMode]);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const totalSeconds = DURATIONS[mode];
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return {
    mode,
    isRunning,
    secondsLeft,
    sessionCount,
    minutes,
    seconds,
    progress,
    start,
    pause,
    toggle,
    reset,
    switchMode,
  };
}
