import Image from "next/image";
import localFont from "next/font/local";
import logoImg from '@/images/Logo.png'
import albumImg from '@/images/eminem.jpg'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} main`}>
      <div className="sidebar">
        <div className="logo">
          <a href="#">
          <img src={logoImg.src} alt="Logo" />
          </a>
        </div>

        <div className="navigation">
          <ul>
            <li>
              <a href="#">
                <span className="fa fa-home"></span>
                <span>Home</span>
              </a>
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
    <input 
      type="text" 
      placeholder="Bạn muốn nghe gì?"
    />
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
                <a href="#">Sign Up</a>
              </li>
            </ul>
            <button type="button">Log In</button>
          </div>
        </div>

        

    
        
      </div>

      
      </div>
    );
  }