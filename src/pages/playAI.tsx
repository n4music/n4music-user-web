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

interface Genre {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  meta: {
    origin: string;
    popularity: number;
  };
}

export default function PlayAI({ onShowPlaybar }: HomeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isChoosePlaylistOpen, setIsChoosePlaylistOpen] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [userInput, setUserInput] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
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
    const fetchGenres = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('Chưa đăng nhập');
          return;
        }

        const response = await fetch('https://n4music-web-api.binnguyen.id.vn/genre', {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Không thể lấy danh sách thể loại');
        }

        const data = await response.json();
        console.log('Raw API Response:', data); // Log để kiểm tra dữ liệu thô

        if (Array.isArray(data)) {
          setGenres(data);
          console.log('Processed Genres:', data); // Log sau khi xử lý
        } else {
          console.error('Dữ liệu không đúng định dạng:', data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách thể loại:', error);
      }
    };

    fetchGenres();
  }, []);

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

  const handleGetSuggestion = async () => {
    if (!userInput.trim()) {
      alert('Vui lòng nhập mô tả ý tưởng bài hát của bạn');
      return;
    }

    try {
      setIsGenerating(true);
      const response = await fetch('http://127.0.0.1:5000/generate_prompt_suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ context: userInput })
      });

      if (!response.ok) {
        throw new Error('Lỗi khi gọi API');
      }

      const data = await response.json();
      if (data.suggestion) {
        setSuggestion(data.suggestion);
      }
    } catch (error) {
      console.error('Lỗi khi lấy gợi ý:', error);
      alert('Có lỗi xảy ra khi tạo gợi ý. Vui lòng thử lại sau.');
    } finally {
      setIsGenerating(false);
    }
  };
  const handleGenerateMusic = async () => {
    if (!selectedGenre || !suggestion.trim()) {
      alert('Vui lòng chọn thể loại và nhập mô tả bài hát');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vui lòng đăng nhập để sử dụng tính năng này');
        return;
      }

      setIsGenerating(true);
      const response = await fetch('https://n4music-web-api.binnguyen.id.vn/v1/songs', {
        method: 'POST',
        headers: {
          'accept': '*/*', 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          context: suggestion,
          gense: parseInt(selectedGenre)
        })
      });

      if (!response.ok) {
        throw new Error('Không thể tạo nhạc. Vui lòng thử lại sau.');
      }

      const data = await response.json();
      console.log('API Response:', data);
      alert('Yêu cầu tạo nhạc đã được gửi. Vui lòng đợi trong giây lát...');

      // Subscribe to Kafka events
      const kafkaClient = new WebSocket('ws://your-kafka-websocket-endpoint');
      
      kafkaClient.onmessage = (event) => {
        const kafkaData = JSON.parse(event.data);
        
        if (kafkaData.topic === 'generate_music_result') {
          // Handle music generation result
          console.log('Music generated:', kafkaData.result);
          // Update UI with generated music
        }
        
        if (kafkaData.topic === 'generate_song_name_result') {
          // Handle song name generation result
          console.log('Song name generated:', kafkaData.result);
          // Update UI with generated song name
        }
        
        if (kafkaData.topic === 'generate_image_result') {
          // Handle image generation result 
          console.log('Image generated:', kafkaData.result);
          // Update UI with generated image
        }
      };

      kafkaClient.onerror = (error) => {
        console.error('WebSocket error:', error);
        alert('Có lỗi xảy ra khi nhận kết quả. Vui lòng thử lại sau.');
      };

    } catch (error) {
      console.error('Lỗi khi tạo nhạc:', error);
      alert('Có lỗi xảy ra khi tạo nhạc. Vui lòng thử lại sau.');
    } finally {
      setIsGenerating(false);
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

        <div className="ai-container">
          <div className="ai-content">
            <h1 className="ai-title">Tạo nhạc bằng AI</h1>
            
            <div className="ai-input-section">
              <textarea 
                className="ai-textarea"
                placeholder="Mô tả ý tưởng bài hát của bạn..."
                rows={6}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button 
                className="ai-generate-btn" 
                style={{marginBottom: '30px'}}
                onClick={handleGetSuggestion}
                disabled={isGenerating}
              >
                <i className="fas fa-magic"></i>
                {isGenerating ? 'Đang xử lý...' : 'Gợi ý'}
              </button>
              <textarea 
                className="ai-textarea"
                placeholder="Chỉnh sửa lại cho phù hợp với bạn..."
                rows={6}
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
              />
              
              <div className="form-group">
                <label>Thể loại nhạc</label>

                <select 
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  required
                >
                  <option value="">Chọn thể loại</option>
                  {genres && genres.length > 0 ? (
                    genres.map((genre) => (
                      <option key={genre.id} value={genre.id.toString()}>
                        {genre.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>Đang tải thể loại...</option>
                  )}
                </select>
              </div>
              <button 
                className="ai-generate-btn"
                onClick={handleGenerateMusic}
                disabled={isGenerating}
              >
                <i className="fas fa-magic"></i>
                {isGenerating ? 'Đang tạo nhạc...' : 'Tạo nhạc'}
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
