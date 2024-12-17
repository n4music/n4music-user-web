import localFont from "next/font/local";
import logoImg from '@/images/Logo.png'
import albumImg from '@/images/eminem.jpg'
import Head from 'next/head';
import Link from 'next/link';
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

export default function dowlike({ onShowPlaybar }: HomeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

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
      
      const response = await fetch('https://n4music-web-api.binnguyen.id.vn/v1/auth/logout', {
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

  const handleCreatePlaylist = async (playlistName: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Vui lòng đăng nhập để tạo playlist');
        return;
      }
  
      const response = await fetch('https://n4music-web-api.binnguyen.id.vn/playlist', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: playlistName,
          description: "This is my favorite playlist",
          avatar: "http://example.com/avatar.png",
          memberId: 1,
          meta: {
            genre: "Pop"
          }
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Không thể tạo playlist');
      }
  
      const result = await response.json();
      console.log('Tạo playlist thành công:', result);
      alert('Tạo playlist thành công!');
  
    } catch (error) {
      console.error('Lỗi khi tạo playlist:', error);
      throw error;
    }
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
