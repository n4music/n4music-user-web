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

interface Song {
  id: number;
  name: string;
  description: string;
  avatar: string;
  type: number;
  status: number;
  meta: {
    genre: string;
    length: string;
  };
  artist: {
    id: number;
    name: string;
    description: string;
    status: number;
    meta: any;
  };
}

export default function Home({ onShowPlaybar }: HomeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isChoosePlaylistOpen, setIsChoosePlaylistOpen] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [randomSongs, setRandomSongs] = useState<Song[]>([]);
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

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.log('Chưa đăng nhập');
          return;
        }

        const response = await fetch('https://n4music-web-api.binnguyen.id.vn/v1/songs', {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            setIsLoggedIn(false);
            setUserInfo(null);
            throw new Error('Phiên đăng nhập đã hết hạn');
          }
          throw new Error('Không thể lấy danh sách bài hát');
        }
        
        const result = await response.json();
        console.log('API Response:', result); // Debug log
        
        if (result.success && result.data && Array.isArray(result.data.data)) {
          setSongs(result.data.data);
        } else {
          console.error('Cấu trúc data không đúng:', result);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bài hát:', error);
      }
    };

    if (isLoggedIn) {
      fetchSongs();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchBar = document.querySelector('.search-bar');
      if (searchBar && !searchBar.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const getRandomSongs = () => {
      const shuffled = [...songs].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 10);
    };

    if (songs.length > 0) {
      setRandomSongs(getRandomSongs());
    }
  }, [songs]);

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
              onFocus={() => setShowDropdown(true)}
              readOnly
            />
            <i className="fas fa-search search-icon"></i>
            
            {showDropdown && (
              <div className="search-dropdown">
                {songs.length > 0 ? (
                  songs.map(song => (
                    <Link 
                      key={song.id}
                      href="/play"
                      onClick={() => {
                        setShowDropdown(false);
                        onShowPlaybar();
                      }}
                    >
                      <div className="search-item">
                        <img src={song.avatar} alt={song.name} width="40" height="40" />
                        <div className="search-item-info">
                          <div className="song-name">{song.name}</div>
                          <div className="artist-name">{song.artist.name}</div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="no-results">Không có bài hát nào</div>
                )}
              </div>
            )}
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

        <div className="spotify-playlists">
          <h2>Hôm nay nghe gì</h2>
          <div className="list">
            {randomSongs.map((song) => (
              <Link 
                key={song.id}
                href="/play" 
                onClick={() => onShowPlaybar()}
              >
                <div className="item">
                  <img src={song.avatar} alt={song.name}/>
                  <div className="play">
                    <span className="fa fa-play"></span>
                  </div>
                  <h4>{song.name}</h4>
                  <p>{song.artist.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <hr />
        </div>


        <div className="spotify-playlists">
          <h2>Nhạc AI dành cho bạn</h2>
          <div className="list">
            <Link href="/list">
              <div className="item">
                <img src={albumImg.src} alt="Album"/>
                <div className="play">
                  <span className="fa fa-play"></span>
                </div>
                <h4>Mood Booster</h4>
                <p>Get happy with today's dose of feel-good...</p>
              </div>
            </Link>

            
          </div>

          <hr />
        </div>

        <div className="spotify-playlists">
          <h2>Album phổ biến</h2>
          <div className="list">
          <Link href="/list">
              <div className="item">
                <img src={albumImg.src} alt="Album"/>
                <div className="play">
                  <span className="fa fa-play"></span>
                </div>
                <h4>Mood Booster</h4>
                <p>Get happy with today's dose of feel-good...</p>
              </div>
            </Link>
          </div>

          <hr />
          </div>
          <footer className="footer">
  <div className="footer-content">
    {/* Phần 1: Hỗ trợ */}
    <div className="footer-section">
      <h4>Hỗ trợ</h4>
      <ul>
        <li><Link href="#">Pháp lý</Link></li>
        <li><Link href="#">Trung tâm an toàn và quyền riêng tư</Link></li>
        <li><Link href="#">Chính sách quyền riêng tư</Link></li>
        <li><Link href="#">Cookie</Link></li>
      </ul>
    </div>

    {/* Phần 2: Cộng đồng */}
    <div className="footer-section">
      <h4>Cộng đồng</h4>
      <ul>
        <li><Link href="#">Dành cho các Nghệ sĩ</Link></li>
        <li><Link href="#">Nhà phát triển</Link></li>
        <li><Link href="#">Quảng cáo</Link></li>
        <li><Link href="#">Nhà đầu tư</Link></li>
        <li><Link href="#">Nhà cung cấp</Link></li>
      </ul>
    </div>

    {/* Phần 3: Liên kết hữu ích */}
    <div className="footer-section">
      <h4>Liên kết hữu ích</h4>
      <ul>
        <li><Link href="#">Ứng dụng Di động Miễn phí</Link></li>
      </ul>
    </div>

    {/* Phần 4: Social Links */}
    <div className="footer-section social">
      <div className="social-icons">
        <Link href="#" className="social-icon">
          <i className="fab fa-twitter"></i>
        </Link>
        <Link href="#" className="social-icon">
          <i className="fab fa-instagram"></i>
        </Link>
        <Link href="#" className="social-icon">
          <i className="fab fa-facebook"></i>
        </Link>
      </div>
    </div>
  </div>
</footer>

      </div>
      

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
  }