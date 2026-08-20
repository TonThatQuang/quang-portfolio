import { useState, useRef, useEffect } from "react";
import {
  FaStepBackward,
  FaPlay,
  FaPause,
  FaStepForward,
  FaVolumeMute,
  FaVolumeDown,
  FaVolumeUp,
} from "react-icons/fa";
import "./MusicPlayer.css";
import musicData from "../../data/musicData";

function MusicPlayer() {
  const audioRef = useRef(null);

  const [currentSong, setCurrentSong] = useState(() =>
    Math.floor(Math.random() * musicData.length)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);

  const song = musicData[currentSong];

  const formatTime = (time) => {
    if (Number.isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev === musicData.length - 1 ? 0 : prev + 1));
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev === 0 ? musicData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.load();

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    playAudio();
  }, [currentSong]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);

      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const handleProgress = (event) => {
    const value = Number(event.target.value);
    setProgress(value);

    if (!audioRef.current) return;

    audioRef.current.currentTime = (value / 100) * duration;
  };

  const handleVolume = (event) => {
    setVolume(Number(event.target.value));
  };

  const handleEnded = () => {
    nextSong();
  };

  return (
    <div className="music-card">
      <img
        src={song.cover}
        alt={song.title}
        className={`album ${isPlaying ? "rotate" : ""}`}
      />

      <div className="music-info">
        <h2>{song.title}</h2>
        <p>{song.artist}</p>

        <input
          type="range"
          className="progress"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgress}
          style={{
            "--progress": `${progress}%`,
          }}
        />

        <div className="time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="controls">
        <button className="btn" onClick={prevSong} aria-label="Previous song">
          <FaStepBackward />
        </button>

        <button className="play" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button className="btn" onClick={nextSong} aria-label="Next song">
          <FaStepForward />
        </button>

        <div className="volume">
          <button className="btn" aria-label="Volume icon">
            {volume === 0 ? <FaVolumeMute /> : volume < 50 ? <FaVolumeDown /> : <FaVolumeUp />}
          </button>

          <input
            type="range"
            className="volume-slider"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolume}
            style={{
              "--volume": `${volume}%`,
            }}
          />
        </div>
      </div>

      <audio ref={audioRef} src={song.audio} preload="metadata" onEnded={handleEnded} />
    </div>
  );
}

export default MusicPlayer;