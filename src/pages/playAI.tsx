import localFont from "next/font/local";
import logoImg from '@/images/Logo.png'
import Head from 'next/head';
import Link from 'next/link';


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

export default function PlayAI() {
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

        <div className="ai-container">
          <div className="ai-content">
            <h1 className="ai-title">Tạo nhạc bằng AI</h1>
            
            <div className="ai-input-section">
              <textarea 
                className="ai-textarea"
                placeholder="Mô tả ý tưởng bài hát của bạn..."
                rows={6}
              />
              <button className="ai-generate-btn">
                <i className="fas fa-magic"></i>
                Tạo nhạc
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
    </div>
  );
}
