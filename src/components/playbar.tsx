import { useState } from 'react';
import albumImg from '@/images/Logo.png';

interface PlaybarProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function Playbar({ isVisible, onClose }: PlaybarProps) {
  if (!isVisible) return null;

  return (
    <div className="player-controls">
      <div className="now-playing">
        <img src={albumImg.src} alt="Album" width="50px" height="50px" />
        <div className="now-playing-info">
          <div className="now-playing-title">Đi Giữa Trời Rực Rỡ</div>
          <div className="now-playing-artist">Ngô Lan Hương</div>
        </div>
      </div>

      <div className="controls">
        <div className="main-controls">
          <button className="control-button">
            <i className="fas fa-random icon"></i>
          </button>
          <button className="control-button">
            <i className="fas fa-step-backward icon"></i>
          </button>
          <button className="play-button">
            <i className="fas fa-play play-icon"></i>
          </button>
          <button className="control-button">
            <i className="fas fa-step-forward icon"></i>
          </button>
          <button className="control-button">
            <i className="fas fa-redo icon"></i>
          </button>
        </div>
        <div className="progress-bar">
          <span className="time">0:00</span>
          <div className="progress">
            <div className="progress-fill" style={{ width: '20%' }}></div>
          </div>
          <span className="time">3:45</span>
        </div>
      </div>

      <div className="volume-controls">
        <i className="fas fa-volume-up icon"></i>
        <div className="volume-bar">
          <div className="volume-fill" style={{ width: '70%' }}></div>
        </div>
        <div className="end-icon">
        <i className="fas fa-list-ul icon" ></i>
        <i className="fas fa-arrow-down icon"></i>
        <i className="fas fa-heart icon"></i>
        <i className="fas fa-times icon" onClick={onClose} ></i>
        </div>
      </div>
    </div>
  );
}
