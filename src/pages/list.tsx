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

export default function List() {
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
                <span>Your Playlist</span>
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

        <div className="playlist-container">
          <div className="playlist-header">
          <img src={albumImg.src} alt="Album" width="232" height="232" />
            
            <div className="playlist-info">
              <p className="playlist-type">Playlist</p>
              <h1>K-Pop Ngay Lúc Này</h1>
              <p className="playlist-description">Fan K-Pop cứng từ hơn lúc này? Ảnh bìa: G-DRAGON, TAEYANG, DAESUNG</p>
              <div className="playlist-meta">
                
                <span>52 bài hát</span>
              </div>
            </div>
          </div>

          <div className="playlist-controls">
  <button className="btn-play">
    <span className="fa fa-play"></span>
  </button>
  <button className="btn-icon">
    <span className="fa fas fa-heart"></span>
  </button>
  <button className="btn-icon">
    <span className="fa fas fa-ellipsis-h"></span>
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
              <div className="track">
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
    </div>
  );
}
