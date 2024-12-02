import localFont from "next/font/local";
import logoImg from '@/images/Logo.png'
import albumImg from '@/images/eminem.jpg'
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import CreatePlaylistModal from '../components/CreatePlaylistModal';

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
interface HomeProps {
  onShowPlaybar: () => void;
}

export default function DowLike({ onShowPlaybar }: HomeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePlaylist = (playlistName: string) => {
    console.log('Tạo playlist mới:', playlistName);
  };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} main`}>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
      <div className="sidebar">
        <div className="logo">
          <a href="#">
            <img src={logoImg.src} alt="Logo" />
          </a>
        </div>

        <div className="navigation">
          <ul>
            <li>
              <Link href="/">
                <span className="fa fa-home"></span>
                <span>Home</span>
              </Link>
            </li>

            <li>
              <Link href="/playAI">
                <span className="fas fa-robot"></span>
                <span>Tạo nhạc AI</span>
              </Link>
            </li>

            <li>
              <Link href="/playlist">
                <span className="fa fas fa-book"></span>
                <span>Your Playlist</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="navigation">
          <ul>
            <li>
              <a onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
                <span className="fa fas fa-plus-square"></span>
                <span>Create Playlist</span>
              </a>
            </li>

            <li>
              <Link href="/dow-like">
                <span className="fa fas fa-heart"></span>
                <span>Liked Songs</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="main-container">
      <div className="topbar">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Bạn muốn nghe gì?"
            />
            <i className="fas fa-search search-icon"></i>
          </div>

          <div className="navbar">
            <ul>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
              <Link href="/dow-like">Download</Link>
                
              </li>
              <li className="divider">|</li>
              <li>
              <Link href="/sign-up/step1">Sign Up</Link>
              </li>
            </ul>
            <Link href="/login">
              <button type="button">Log In</button>
            </Link>
          </div>
        </div>

        <div className="download-container">
          <div className="download-list-container">
            <h1 className="download-title">Nhạc tải xuống</h1>
            <div className="download-list-header">
              <div>#</div>
              <div>Tiêu đề</div>
              <div>
                <i className="far fa-clock"></i>
              </div>
            </div>

            <div className="download-list">
            <Link 
  href="/play" 
  onClick={() => onShowPlaybar()}
>
  <div className="download-item" style={{cursor: 'pointer'}}>
    <div className="item-number">1</div>
    <div className="item-info">
      <img src={albumImg.src} alt="Album" width="40px" height="40px" />
      <div>
        <div className="item-title">number one girl</div>
        <div className="item-artist">ROSÉ</div>
      </div>
    </div>
    <div className="item-duration">3:36</div>
  </div>
</Link>
            </div>
          </div>
        </div>
      </div>
      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
}
