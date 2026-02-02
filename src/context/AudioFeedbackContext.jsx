import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";

const AudioFeedbackContext = createContext();

export const useAudioFeedback = () => {
  const context = useContext(AudioFeedbackContext);
  if (!context) {
    throw new Error("useAudioFeedback must be used within an AudioFeedbackProvider");
  }
  return context;
};

export const AudioFeedbackProvider = ({ children }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(() => {
    const saved = localStorage.getItem("audioFeedback");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const audioCtxRef = useRef(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback((frequency, duration, type = "sine") => {
    if (!isAudioEnabled) return;
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Silently fail if audio not supported
    }
  }, [isAudioEnabled, getAudioContext]);

  const playClick = useCallback(() => {
    playTone(800, 0.08, "square");
  }, [playTone]);

  const playAccordionOpen = useCallback(() => {
    if (!isAudioEnabled) return;
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Silently fail
    }
  }, [isAudioEnabled, getAudioContext]);

  const playAccordionClose = useCallback(() => {
    if (!isAudioEnabled) return;
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Silently fail
    }
  }, [isAudioEnabled, getAudioContext]);

  const toggleAudio = useCallback(() => {
    setIsAudioEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("audioFeedback", JSON.stringify(next));
      return next;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const value = {
    isAudioEnabled,
    toggleAudio,
    playClick,
    playAccordionOpen,
    playAccordionClose,
  };

  return (
    <AudioFeedbackContext.Provider value={value}>
      {children}
    </AudioFeedbackContext.Provider>
  );
};
