"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./AudioPlayer.module.css";

const AUDIO_SRC = "/audio/voxa-voice.mp3";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const onEnded = () => setPlaying(false);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <div className={styles.wrap}>
      <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" playsInline />
      <button
        type="button"
        className={styles.btn}
        onClick={toggle}
        aria-label={playing ? "Pause audio" : "Play audio"}
        aria-pressed={playing}
      >
        {playing ? (
          <Pause className={styles.icon} aria-hidden="true" />
        ) : (
          <Play className={styles.icon} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
