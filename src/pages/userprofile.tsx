import localFont from "next/font/local";
import logoImg from '@/images/Logo.png'
import albumImg from '@/images/eminem.jpg'
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

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

export default function UserProfile() {
  const [avatarImage, setAvatarImage] = useState(albumImg.src);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarImage(imageUrl);
    }
  };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} main`}>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>

      <div className="sidebar">
        <div className="logo">
          <Link href="/">
            <img src={logoImg.src} alt="Logo" />
          </Link>
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
            <input type="text" placeholder="Bạn muốn nghe gì?" />
            <i className="fas fa-search search-icon"></i>
          </div>

          <div className="navbar">
            <ul>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <Link href="/dow-like">Download</Link>
              </li>
              <li className="divider">|</li>
              <li>
                <Link href="/sign-up/step1">Sign Up</Link>
              </li>
            </ul>
            <Link href="/login">
              <button type="button">Log In</button>
            </Link>
          </div>
        </div>

        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <img src={avatarImage} alt="Profile" />
              <label className="edit-avatar" htmlFor="avatar-upload">
                <i className="fas fa-camera"></i>
                <input 
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div className="profile-info">
              <h1>User Profile</h1>
              <p>Name</p>
              <div className="profile-stats">
                <span>10 Playlists</span>
                <span>•</span>
                <span>150 Liked Songs</span>
              </div>
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-section">
              <h2>Personal Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Email</label>
                  <p>user@example.com</p>
                </div>
                <div className="info-item">
                  <label>Date Joined</label>
                  <p>January 1, 2024</p>
                </div>
                <div className="info-item">
                  <label>Gender</label>
                  <p>Man</p>
                </div>
              </div>
              <button className="edit-profile-btn">
                <i className="fas fa-edit"></i>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
