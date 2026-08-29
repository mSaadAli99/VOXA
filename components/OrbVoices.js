"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./OrbVoices.module.css";

const VOICES = [
  {
    id: "customer-service",
    src: "/images/voices/customer-service.png",
    alt: "Customer service voice",
    label: "Customer Service",
    placement: "topRight",
    audio: "/audio/customer-service-voice.mp3",
  },
  {
    id: "news-anchor-m",
    src: "/images/voices/news-anchor-m.png",
    alt: "News anchor male voice",
    label: "News Anchor",
    featured: true,
    placement: "featured",
    audio: "/audio/featured-voice.mp3",
  },
  {
    id: "news-anchor-f",
    src: "/images/voices/news-anchor-f.png",
    alt: "News anchor female voice",
    label: "News Anchor",
    placement: "midRight",
    audio: "/audio/news-anchor-f-voice.mp3",
  },
  {
    id: "narration",
    src: "/images/voices/narration.png",
    alt: "Narration voice",
    label: "Narration",
    placement: "bottom",
    audio: "/audio/narration-voice.mp3",
  },
];

function WaveformIcon({ playing = false, compact = false }) {
  return (
    <svg
      className={`${compact ? styles.waveformCompact : styles.waveform} ${
        playing ? styles.waveformPlaying : ""
      }`}
      viewBox="0 0 72 24"
      aria-hidden="true"
    >
      <rect className={styles.bar} x="4" y="10" width="4" height="8" rx="2" fill="currentColor" />
      <rect className={styles.bar} x="14" y="6" width="4" height="16" rx="2" fill="currentColor" />
      <rect className={styles.bar} x="24" y="2" width="4" height="20" rx="2" fill="currentColor" />
      <rect className={styles.bar} x="34" y="8" width="4" height="12" rx="2" fill="currentColor" />
      <rect className={styles.bar} x="44" y="4" width="4" height="18" rx="2" fill="currentColor" />
      <rect className={styles.bar} x="54" y="9" width="4" height="10" rx="2" fill="currentColor" />
      <rect className={styles.bar} x="64" y="6" width="4" height="14" rx="2" fill="currentColor" />
    </svg>
  );
}

function VoiceBubble({ voice, playing = false, onHoverStart, onHoverEnd }) {
  const isInteractive = Boolean(voice.audio);
  const bubbleClass = [
    styles.bubble,
    voice.featured ? styles.bubbleFeatured : styles[voice.placement],
    playing ? styles.bubblePlaying : "",
    isInteractive ? styles.bubbleInteractive : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.photo} src={voice.src} alt={voice.alt} draggable={false} />
      {voice.audio ? (
        <div
          className={`${styles.waveWrap} ${voice.featured ? "" : styles.waveWrapCompact}`}
          aria-hidden="true"
        >
          <WaveformIcon playing={playing} compact={!voice.featured} />
        </div>
      ) : null}
      <figcaption className={styles.caption}>{voice.label}</figcaption>
    </>
  );

  if (isInteractive) {
    return (
      <div
        className={bubbleClass}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") onHoverStart(voice);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") onHoverEnd(voice);
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") {
            event.preventDefault();
            onHoverStart(voice);
          }
        }}
        onPointerUp={(event) => {
          if (event.pointerType !== "mouse") onHoverEnd(voice);
        }}
        onPointerCancel={(event) => {
          if (event.pointerType !== "mouse") onHoverEnd(voice);
        }}
        role="group"
        aria-label={`Preview ${voice.label} voice`}
      >
        {content}
      </div>
    );
  }

  return <figure className={bubbleClass}>{content}</figure>;
}

export default function OrbVoices() {
  const audiosRef = useRef({});
  const unlockedRef = useRef(false);
  const activeVoiceIdRef = useRef(null);
  const [activeVoiceId, setActiveVoiceId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const featured = VOICES.find((voice) => voice.featured);
  const satellites = VOICES.filter((voice) => !voice.featured);

  useEffect(() => {
    const audios = {};

    VOICES.forEach((voice) => {
      if (!voice.audio) return;

      const audio = new Audio(voice.audio);
      audio.preload = "auto";
      audio.playsInline = true;

      const onEnded = () => {
        if (activeVoiceIdRef.current !== voice.id) return;
        setPlaying(false);
        activeVoiceIdRef.current = null;
        setActiveVoiceId(null);
      };
      const onPause = () => {
        if (activeVoiceIdRef.current === voice.id) setPlaying(false);
      };
      const onPlay = () => {
        activeVoiceIdRef.current = voice.id;
        setActiveVoiceId(voice.id);
        setPlaying(true);
      };

      audio.addEventListener("ended", onEnded);
      audio.addEventListener("pause", onPause);
      audio.addEventListener("play", onPlay);
      audios[voice.id] = audio;
    });

    audiosRef.current = audios;

    return () => {
      Object.values(audios).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      audiosRef.current = {};
    };
  }, []);

  const unlockAudio = async () => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;

    await Promise.all(
      Object.values(audiosRef.current).map(async (audio) => {
        try {
          audio.muted = true;
          await audio.play();
          audio.pause();
          audio.currentTime = 0;
          audio.muted = false;
        } catch {
          /* ignore unlock failures */
        }
      }),
    );
  };

  const stopAll = (exceptId = null) => {
    Object.entries(audiosRef.current).forEach(([id, audio]) => {
      if (id === exceptId) return;
      audio.pause();
      audio.currentTime = 0;
    });
  };

  const playVoice = async (voice) => {
    const audio = audiosRef.current[voice.id];
    if (!audio) return;

    await unlockAudio();
    stopAll(voice.id);
    audio.currentTime = 0;
    activeVoiceIdRef.current = voice.id;
    setActiveVoiceId(voice.id);

    try {
      await audio.play();
    } catch {
      setPlaying(false);
      activeVoiceIdRef.current = null;
      setActiveVoiceId(null);
    }
  };

  const stopVoice = (voice) => {
    const audio = audiosRef.current[voice.id];
    if (!audio || activeVoiceIdRef.current !== voice.id) return;

    audio.pause();
    audio.currentTime = 0;
    activeVoiceIdRef.current = null;
    setActiveVoiceId(null);
    setPlaying(false);
  };

  return (
    <section
      className={styles.section}
      aria-label="VOXA voices"
      data-snap-section
      data-snap-free
      onPointerDown={unlockAudio}
    >
      <div className={styles.inner}>
        <ScrollReveal
          as="p"
          className={styles.kicker}
          once
          baseOpacity={0.1}
          enableBlur
          baseRotation={2}
          blurStrength={3}
        >
          Voices
        </ScrollReveal>
        <ScrollReveal
          as="h2"
          className={styles.title}
          once
          baseOpacity={0.1}
          enableBlur
          baseRotation={2}
          blurStrength={4}
        >
          Natural voices for every conversation
        </ScrollReveal>
        <ScrollReveal
          as="p"
          className={styles.lede}
          once
          baseOpacity={0.1}
          enableBlur
          baseRotation={2}
          blurStrength={3}
        >
          Hear how VOXA sounds across customer service, news, narration, and more.
        </ScrollReveal>

        <div className={styles.collage}>
          {featured ? (
            <VoiceBubble
              voice={featured}
              playing={playing && activeVoiceId === featured.id}
              onHoverStart={playVoice}
              onHoverEnd={stopVoice}
            />
          ) : null}
          <div className={styles.satellites}>
            {satellites.map((voice) => (
              <VoiceBubble
                key={voice.id}
                voice={voice}
                playing={playing && activeVoiceId === voice.id}
                onHoverStart={playVoice}
                onHoverEnd={stopVoice}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
