import localFont from "next/font/local";
import logoImg from '@/images/Logo.png'
import albumImg from '@/images/eminem.jpg'
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import CreatePlaylistModal from '../components/CreatePlaylistModal';
import ChoosePlaylist from '../components/chooseplaylist';
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

export default function list({ onShowPlaybar }: HomeProps) {
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

        <div className="playlist-container">
          <div className="playlist-header">
          <img src={albumImg.src} alt="Album" width="232" height="232" />
            
            <div className="playlist-info">
              <p className="playlist-type">Playlist</p>
              <h1>K-Pop Ngay Lúc Này</h1>
              <div className="playlist-meta">    
                <span>52 bài hát</span>
              </div>
            </div>
          </div>

          <div className="playlist-controls">
          <Link href="/play">
  <button className="btn-play" onClick={() => onShowPlaybar()}>
    <span className="fa fa-play"></span>
  </button>
</Link>

  <button className="btn-icon">
    <span className="fa fas fa-heart"></span>
  </button>
  <button 
  className="btn-icon"
  onClick={() => setIsChoosePlaylistOpen(true)}
>
  <span className="fa fas fa-book"></span>
</button>

</div>


          <div className="track-list-container">
          <div className="track-list-header">
  <div>#</div>
  <div>Tiêu đề</div>
  <div>Album</div>
  <div>
    <i className="far fa-clock"></i>
  </div>
</div>

            <div className="track-list">
            <Link href="/play" onClick={() => onShowPlaybar()}>
  <div className="track" style={{cursor: 'pointer'}}>
    <div className="track-number">1</div>
    <div className="track-info">
      <img src={albumImg.src} alt="Album" width="40px" height="40px" />
      <div>
        <div className="track-title">number one girl</div>
        <div className="track-artist">ROSÉ</div>
      </div>
    </div>
    <div className="track-album">number one girl</div>
    <div className="track-duration">3:36</div>
  </div>
</Link>


              <div className="track">
                <div className="track-number">2</div>
                <div className="track-info">
                <img src={albumImg.src} alt="Album" width="40px" height="40px" />
                  <div>
                    <div className="track-title">HOME SWEET HOME (feat. TAEYANG & DAESUNG)</div>
                    <div className="track-artist">G-DRAGON, TAEYANG, DAESUNG</div>
                  </div>
                </div>
                <div className="track-album">HOME SWEET HOME (feat. TAEYANG & DAESUNG)</div>
                <div className="track-duration">3:31</div>
              </div>
              <div className="track">
                <div className="track-number">2</div>
                <div className="track-info">
                <img src={albumImg.src} alt="Album" width="40px" height="40px" />
                  <div>
                    <div className="track-title">HOME SWEET HOME (feat. TAEYANG & DAESUNG)</div>
                    <div className="track-artist">G-DRAGON, TAEYANG, DAESUNG</div>
                  </div>
                </div>
                <div className="track-album">HOME SWEET HOME (feat. TAEYANG & DAESUNG)</div>
                <div className="track-duration">3:31</div>
              </div>
              <div className="track">
                <div className="track-number">2</div>
                <div className="track-info">
                <img src={albumImg.src} alt="Album" width="40px" height="40px" />
                  <div>
                    <div className="track-title">HOME SWEET HOME (feat. TAEYANG & DAESUNG)</div>
                    <div className="track-artist">G-DRAGON, TAEYANG, DAESUNG</div>
                  </div>
                </div>
                <div className="track-album">HOME SWEET HOME (feat. TAEYANG & DAESUNG)</div>
                <div className="track-duration">3:31</div>
              </div>

              <div className="track">
                <div className="track-number">3</div>
                <div className="track-info">
                <img src={albumImg.src} alt="Album" width="40px" height="40px" />
                  <div>
                    <div className="track-title">Whiplash</div>
                    <div className="track-artist">Various Artists</div>
                  </div>
                </div>
                <div className="track-album">Whiplash - The 5th Mini Album</div>
                <div className="track-duration">3:03</div>
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
      
<ChoosePlaylist
  isOpen={isChoosePlaylistOpen}
  onClose={() => setIsChoosePlaylistOpen(false)}
  playlists={playlists}
/>
    </div>
  );
}
