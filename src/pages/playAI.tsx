import localFont from "next/font/local";
import logoImg from '@/images/Logo.png'
import Head from 'next/head';
import Link from 'next/link';
import albumImg from '@/images/eminem.jpg'
import { useState, useEffect } from 'react';
import CreatePlaylistModal from '../components/CreatePlaylistModal';
import UserMenu from '../components/UserMenu';

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

interface UserInfo {
  nickname: string;
  avatar: string;
}

export default function PlayAI({ onShowPlaybar }: HomeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isChoosePlaylistOpen, setIsChoosePlaylistOpen] = useState(false);
  const playlists = [
    {
      id: 1,
      name: 'My Playlist #1',
      songCount: 10,
      image: albumImg.src
    },
  ];

  useEffect(() => {
    // Kiểm tra token và userInfo trong localStorage
    const token = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem('userInfo');
    
    console.log('Stored token:', token); // Debug log
    console.log('Stored userInfo:', storedUserInfo); // Debug log

    if (token && storedUserInfo) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []); // Chạy một lần khi component mount

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://bill.binnguyen.id.vn/v1/auth/logout', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Sau khi logout thành công từ server
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      setIsLoggedIn(false);
      setUserInfo(null);

    } catch (error) {
      console.error('Lỗi khi logout:', error);
      // Vẫn xóa thông tin local trong trường hợp lỗi
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      setIsLoggedIn(false);
      setUserInfo(null);
    }
  };

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
              <li><a href="#">Support</a></li>
              <li><Link href="/dow-like">Download</Link></li>
              <li className="divider">|</li>
            </ul>
            <UserMenu 
              isLoggedIn={isLoggedIn}
              userInfo={userInfo && {
                name: userInfo.nickname,
                avatar: userInfo.avatar
              }}
              onLogout={handleLogout}
            />
          </div>
        </div>

        <div className="ai-container">
          <div className="ai-content">
            <h1 className="ai-title">Tạo nhạc bằng AI</h1>
            
            <div className="ai-input-section">
              <textarea 
                className="ai-textarea"
                placeholder="Mô tả ý tưởng bài hát của bạn..."
                rows={6}
              />
              <button className="ai-generate-btn" style={{marginBottom: '30px'}}>
                <i className="fas fa-magic"></i>
                Gợi ý
              </button>
              <textarea 
                className="ai-textarea"
                placeholder="Chỉnh sửa lại cho phù hợp với bạn..."
                rows={6}
              />
              <button className="ai-generate-btn">
                <i className="fas fa-magic"></i>
                Tạo nhạc
              </button>
            </div>

            <div className="ai-result-section">
              
              <div className="ai-player">
                <div className="playAI-info">
                  <h3>Bài hát được tạo</h3>
                  <p>Được tạo bởi AI</p>
                </div>
                <div className="playAI-controls">
                <button className="play-btnAI">
  <i className="fas fa-play-circle"></i>
</button>
                  <div className="progress-barAI">
                    <div className="progressAI"></div>
                  </div>
                  <span className="durationAI">0:00</span>
                </div>
              </div>
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
