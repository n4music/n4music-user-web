import localFont from "next/font/local";
import logoImg from '@/images/Logo.png'
import albumImg from '@/images/eminem.jpg'
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react'

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

export default function Play() {
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
              <a href="#">
                <span className="fa fa-search"></span>
                <span>Search List</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="fa fas fa-book"></span>
                <span>Your Library</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="navigation">
          <ul>
            <li>
              <a href="#">
                <span className="fa fas fa-plus-square"></span>
                <span>Create Playlist</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="fa fas fa-heart"></span>
                <span>Liked Songs</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="main-container">
        <div className="topbar">
          <div className="search-bar">
            <input type="text" placeholder="Bạn muốn nghe gì?" />
            <i className="fas fa-search search-icon"></i>
          </div>

          <div className="navbar">
            <ul>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Download</a>
              </li>
              <li className="divider">|</li>
              <li>
                <a href="/sign-up/step1">Sign Up</a>
              </li>
            </ul>
            <Link href="/login">
              <button type="button">Log In</button>
            </Link>
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
    </div>
  )
}
