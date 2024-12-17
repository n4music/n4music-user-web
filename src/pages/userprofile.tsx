
import localFont from "next/font/local";
import logoImg from '@/images/Logo.png'
import albumImg from '@/images/User.png'
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
export default function UserProfile({ onShowPlaybar }: HomeProps) {
  const [avatarImage, setAvatarImage] = useState(albumImg.src);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarImage(imageUrl);
    }
  };
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

        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <img src={avatarImage} alt="Profile" />
              <label className="edit-avatar" htmlFor="avatar-upload">
                <i className="fas fa-camera"></i>
                <input 
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div className="profile-info">
              <h1>User Profile</h1>
              <p>Name</p>
              <div className="profile-stats">
                <span>10 Playlists</span>
                <span>•</span>
                <span>150 Liked Songs</span>
              </div>
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-section">
              <h2>Personal Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Email</label>
                  <p>user@example.com</p>
                </div>
                <div className="info-item">
                  <label>Date Joined</label>
                  <p>January 1, 2024</p>
                </div>
                <div className="info-item">
                  <label>Gender</label>
                  <p>Man</p>
                </div>
              </div>
              <button className="edit-profile-btn">
                <i className="fas fa-edit"></i>
                Edit Profile
              </button>
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
