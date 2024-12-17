import { useState, useRef, useEffect } from 'react';
import albumImg from '@/images/Logo.png';
import { useSong } from '../contexts/SongContext';

export default function Playbar() {
  const { currentSong, selectedSongId } = useSong();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioUrl = currentSong?.records?.find(record => record.id === selectedSongId)?.file;

  useEffect(() => {
    console.log('Song data:', currentSong);
    console.log('Audio URL:', audioUrl);
  }, [currentSong, audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = async () => {
    if (!audioRef.current) {
      console.error("Audio element not found");
      return;
    }

    if (!audioUrl) {
      console.error("No audio source available", currentSong);
      return;
    }

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (!duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
      const newTime = clickPosition * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const volumeBar = e.currentTarget;
    const clickPosition = (e.clientX - volumeBar.getBoundingClientRect().left) / volumeBar.offsetWidth;
    setVolume(Math.max(0, Math.min(1, clickPosition)));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentSong || !audioUrl) {
    console.log("No song or audio URL available");
    return null;
  }

  return (
    <div className="player-controls">
      <audio 
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => console.error("Audio error:", e)}
      />
      
      <div className="now-playing">
        <img 
          src={currentSong?.avatar || albumImg.src} 
          alt="Album" 
          width="50px" 
          height="50px" 
        />
        <div className="now-playing-info">
          <div className="now-playing-title">
            {currentSong?.name || "Đi Giữa Trời Rực Rỡ"}
          </div>
          <div className="now-playing-artist">
            {currentSong?.artist?.name || "Ngô Lan Hương"}
          </div>
        </div>
      </div>

      <div className="controls">
        <div className="main-controls">
          <i className="fas fa-step-backward icon"></i>
          <i 
            className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} icon play-pause`}
            onClick={togglePlay}
          ></i>
          <i className="fas fa-step-forward icon"></i>
        </div>
        <div className="timeline">
          <span className="time">{formatTime(currentTime)}</span>
          <div className="progress" onClick={handleProgressClick}>
            <div 
              className="progress-fill" 
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>
      <div className="volume-controls">
        <i className="fas fa-volume-up icon"></i>
        <div className="volume-bar" onClick={handleVolumeChange}>
          <div className="volume-fill" style={{ width: `${volume * 100}%` }}></div>
        </div>
        <div className="end-icon">
          <i className="fas fa-list-ul icon"></i>
          <i className="fas fa-arrow-down icon"></i>
          <i className="fas fa-heart icon"></i>
        </div>
      </div>
    </div>
  );
}
