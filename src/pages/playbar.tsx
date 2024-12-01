import { useState } from 'react';
import Head from 'next/head';
import localFont from "next/font/local";
import albumImg from '@/images/Logo.png';

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
  })
  
  const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
  })
  
interface PlayerControlsProps {
  currentTime: string;
  totalDuration: string;
}

export default function PlayerControls({ currentTime, totalDuration }: PlayerControlsProps) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} main`}>
    <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
    </Head>
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
          <span className="time">{currentTime}</span>
          <div className="progress">
            <div className="progress-fill" style={{ width: '20%' }}></div>
          </div>
          <span className="time">{totalDuration}</span>
        </div>
      </div>

      <div className="volume-controls">
        <i className="fas fa-volume-up icon"></i>
        <div className="volume-bar">
          <div className="volume-fill" style={{ width: '70%' }}></div>
        </div>
        <i className="fas fa-list-ul icon"></i>
        
      </div>
    </div>
    </div>
  );
}
