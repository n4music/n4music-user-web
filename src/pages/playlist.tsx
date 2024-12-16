import localFont from "next/font/local";
import logoImg from '@/images/Logo.png'
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import CreatePlaylistModal from '../components/CreatePlaylistModal';
import UserMenu from '../components/UserMenu';
import defaultPlaylistImg from '@/images/imagesAI.png';
import imagesAI from '@/images/imagesAI.png';

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

interface Playlist {
  id: number;
  name: string;
  description: string;
  avatar: string;
  memberId: number;
  meta: {
    genre: string;
  };
}

export default function Playlist({ onShowPlaybar }: HomeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);

  // Kiểm tra đăng nhập
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem('userInfo');
    
    if (token && storedUserInfo) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  // Fetch playlists
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Vui lòng đăng nhập để xem playlist');
          return;
        }

        console.log('Token being used:', token); // Debug log

        const response = await fetch('https://bill.binnguyen.id.vn/playlist', {
          method: 'GET',
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Response status:', response.status); // Debug log
        console.log('Response headers:', Object.fromEntries(response.headers)); // Debug log

        if (response.status === 401) {
          throw new Error('Unauthorized - Token không hợp lệ hoặc đã hết hạn');
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Debug log

        if (data && Array.isArray(data)) {
          setUserPlaylists(data);
        } else if (data && data.data && Array.isArray(data.data)) {
          setUserPlaylists(data.data);
        } else {
          console.error('Định dạng data không đúng:', data);
          setUserPlaylists([]);
        }

      } catch (error) {
        console.error('Lỗi khi lấy danh sách playlist:', error);
        setUserPlaylists([]);
      }
    };

    if (isLoggedIn) {
      fetchPlaylists();
    }
  }, [isLoggedIn]);

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

      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      setIsLoggedIn(false);
      setUserInfo(null);

    } catch (error) {
      console.error('Lỗi khi logout:', error);
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
  
      const response = await fetch('https://bill.binnguyen.id.vn/playlist', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: playlistName,
          description: "This is my favorite playlist",
          avatar: imagesAI.src,
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
      
      // Fetch lại danh sách playlist sau khi tạo thành công
      const updatedResponse = await fetch('https://bill.binnguyen.id.vn/playlist', {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (updatedResponse.ok) {
        const data = await updatedResponse.json();
        if (data && Array.isArray(data)) {
          setUserPlaylists(data);
        } else if (data && data.data && Array.isArray(data.data)) {
          setUserPlaylists(data.data);
        }
      }

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

        <div className="playlist-main-container">
          <div className="playlist-grid">
            <h1 className="playlist-title">Playlist của bạn</h1>
            <div className="playlist-items">
              {userPlaylists.map((playlist) => (
                <div key={playlist.id} className="playlist-card">
                  <img src={defaultPlaylistImg.src} alt={playlist.name} />
                  <h3>{playlist.name}</h3>
                  <p>{playlist.description}</p>
                </div>
              ))}
              <div 
                className="playlist-card create-playlist"
                onClick={() => setIsModalOpen(true)}
                style={{ cursor: 'pointer' }}
              >
                <span className="fa fa-plus-square"></span>
                <h3>Tạo playlist mới</h3>
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
