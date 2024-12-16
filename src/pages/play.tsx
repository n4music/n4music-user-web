import localFont from "next/font/local";
import logoImg from '@/images/Logo.png'
import albumImg from '@/images/eminem.jpg'
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import UserMenu from '../components/UserMenu';
import CreatePlaylistModal from "@/components/CreatePlaylistModal";

interface Song {
  id: string;
  title: string;
  artist: string;
  views: number;
  duration: string;
  image: string;
}

interface Album {
  id: string;
  title: string;
  year: string;
  type: string;
  image: string;
}

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


  export default function Play({ onShowPlaybar }: HomeProps) {
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
    const [currentTime, setCurrentTime] = useState('0:04')
    const totalDuration = '3:40'
  
    const suggestedSongs: Song[] = [
      {
        id: '1',
        title: 'TÌNH ĐẦU QUÁ CHÉN (feat. Quang Hùng MasterD, Negav, Pháp Kiều & Erik)',
        artist: 'ANH TRAI "SAY HI", Quang Hùng MasterD, Negav, Pháp Kiều, ERIK',
        views: 6480432,
        duration: '5:16',
        image: '/placeholder.svg'
      },
      {
        id: '2',
        title: 'SAO HANG A (feat. HIEUTHUHAI, Dương Domic, Song Luân, JSOL & Trần Đăng Dương)',
        artist: 'ANH TRAI "SAY HI", HIEUTHUHAI, Dương Domic, Song Luân, JSOL, Trần Đăng Dương',
        views: 8443957,
        duration: '4:12',
        image: '/placeholder.svg'
      },
      {
        id: '3',
        title: 'Say Yes (Vietnamese Version)',
        artist: 'Various Artists',
        views: 5234123,
        duration: '3:45',
        image: '/placeholder.svg'
      }
    ];
  
    const albums: Album[] = [
      {
        id: '1',
        title: 'Đi Giữa Trời Rực Rỡ',
        year: '2024',
        type: 'Đĩa đơn',
        image: '/placeholder.svg'
      },
      {
        id: '2',
        title: '#Trầm',
        year: '2022',
        type: 'EP',
        image: '/placeholder.svg'
      },
      {
        id: '3',
        title: 'Yêu Đừng Sợ Đau (Remake)',
        year: '2023',
        type: 'Đĩa đơn',
        image: '/placeholder.svg'
      },
      {
        id: '4',
        title: 'Như Nào',
        year: '2024',
        type: 'Đĩa đơn',
        image: '/placeholder.svg'
      },
      {
        id: '5',
        title: 'Yêu Đừng Sợ Đau',
        year: '2021',
        type: 'Đĩa đơn',
        image: '/placeholder.svg'
      },
      
    ];
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

        <div className="play-container">
          <div className="song-section">
            <div className="song-info">
            <img src={albumImg.src} alt="Album" width="232" height="232" />
              <div className="song-details">
                <span className="label">Bài hát</span>
                <h1 className="title">Đi Giữa Trời Rực Rỡ - From "Đi Giữa Trời Rực Rỡ"</h1>
                <div className="artist">
                  <span>Ngô Lan Hương • Đi Giữa Trời Rực Rỡ • 2024 • 3:40 • 5.301.847</span>
                </div>
              </div>
            </div>

            <div className="lyrics">
              <h2>Lời bài hát</h2>
              <p>Mát lành như dòng suối</p>
              <p>Tâm hồn mới chớm đôi mươi</p>
              <p>Vô tư nơi rừng núi</p>
              <p>Chưa từng ghé chốn xa xôi</p>
              <p>Vào một ngày nắng xanh</p>
              <p>Lặng tránh nhân duyên sắp đặt để rồi mình đi về</p>
            </div>

            <div className="suggested-songs">
              <h2>Đề xuất</h2>
              <p>Dựa trên bài hát này</p>
              <div className="song-list">
                {suggestedSongs.map((song) => (
                  <div key={song.id} className="song-item">
                    <img src={albumImg.src} alt="Album" width="150" height="125" />
                    <div className="song-info">
                      <div className="song-title">{song.title}</div>
                      <div className="song-artist">{song.artist}</div>
                    </div>
                    <div className="song-views">{song.views?.toLocaleString()}</div>
                    <div className="song-duration">{song.duration}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="albums-section">
              <div className="section-header">
                <h2>Các bản phát hành thịnh hành của Ngô Lan Hương</h2>
                <button className="show-all-button">Hiển thị tất cả</button>
              </div>
              <div className="album-grid">
                {albums.map((album) => (
                  <div key={album.id} className="album-card">
                    <img src={albumImg.src} alt="Album" width="200" height="200" />
                    <div className="album-info">
                      <div className="album-title">{album.title}</div>
                      <div className="album-meta">
                        {album.year} • {album.type}
                      </div>
                    </div>
                  </div>
                ))}
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
  )
}
