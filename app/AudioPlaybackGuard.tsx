"use client";

import { useEffect } from "react";

export default function AudioPlaybackGuard() {
  useEffect(() => {
    const pauseOtherTracks = (event: Event) => {
      const startedTrack = event.target;
      if (!(startedTrack instanceof HTMLAudioElement)) return;

      document.querySelectorAll<HTMLAudioElement>("audio").forEach((track) => {
        if (track !== startedTrack && !track.paused) track.pause();
      });
    };

    document.addEventListener("play", pauseOtherTracks, true);
    return () => document.removeEventListener("play", pauseOtherTracks, true);
  }, []);

  return null;
}
