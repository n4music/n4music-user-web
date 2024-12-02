import localFont from "next/font/local";
import logoImg from '@/images/Logo.png'
import Head from 'next/head';
import Link from 'next/link';
import albumImg from '@/images/eminem.jpg'
import { PlayCircleFilled, HeartOutlined, MoreOutlined } from '@ant-design/icons';

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

export default function Playlist() {
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

        <div className="playlist-main-container">
          <div className="playlist-grid">
            <h1 className="playlist-title">Playlist của bạn</h1>
            <div className="playlist-items">
              <div className="playlist-card">
                <img src={albumImg.src} alt="Playlist" />
                <h3>My Playlist #1</h3>
                <p>10 bài hát</p>
              </div>
              <div className="playlist-card">
                <img src={albumImg.src} alt="Playlist" />
                <h3>My Playlist #2</h3>
                <p>15 bài hát</p>
              </div>
              <div className="playlist-card create-playlist">
                <span className="fa fa-plus-square"></span>
                <h3>Tạo playlist mới</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
