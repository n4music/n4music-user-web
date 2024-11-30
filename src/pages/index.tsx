import localFont from "next/font/local";
import logoImg from '@/images/Logo.png'
import albumImg from '@/images/eminem.jpg'
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

export default function Home() {
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
  <Link href="/playlist-like">
    <span className="fa fa-home"></span>
    <span>Your Playlist</span>
  </Link>
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
  <Link href="/playlist-like">
    <span className="fa fa-home"></span>
    <span>Your Playlist</span>
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

        <div className="spotify-playlists">
          <h2>Nhạc thịnh hành</h2>

          <div className="list">
          <Link href="/play">
  <div className="item">
    <img src={albumImg.src} alt="Album"/>
    <div className="play">
      <span className="fa fa-play"></span>
    </div>
    <h4>Peaceful Piano</h4>
    <p>Relax and indulge with beautiful piano pieces</p>
  </div>
</Link>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>RapCaviar</h4>
              <p>New Music from Lil Baby, Juice WRLD an...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>All out 2010s</h4>
              <p>The biggest songs of the 2010s. Cover:...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Rock Classics</h4>
              <p>Rock Legends & epic songs that continue t...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Chill Hits</h4>
              <p>Kick back to the best new and recent chill...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Viva Latino</h4>
              <p>Today's top Latin hits elevando nuestra...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Mega Hit Mix</h4>
              <p>A mega mix of 75 favorites from the last...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>All out 80s</h4>
              <p>The biggest songs of the 1090s.</p>
            </div>
          </div>
        </div>

        <div className="spotify-playlists">
          <h2>Nghệ sĩ phổ biến</h2>
          <div className="list">
            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Peaceful Piano</h4>
              <p>Relax and indulge with beautiful piano pieces</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Deep Focus</h4>
              <p>Keep calm and focus with ambient and pos...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Instrumental Study</h4>
              <p>Focus with soft study music in the...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>chill lofi study beats</h4>
              <p>The perfect study beats, twenty four...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Coding Mode</h4>
              <p>Dedicated to all the programmers out there.</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Focus Flow</h4>
              <p>Uptempo instrumental hip hop beats.</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Calm Before The Storm</h4>
              <p>Calm before the storm music.</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Beats to think to</h4>
              <p>Focus with deep techno and tech house.</p>
            </div>
          </div>
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

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Feelin' Good</h4>
              <p>Feel good with this positively timeless...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Dark & Stormy</h4>
              <p>Beautifully dark, dramatic tracks.</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Feel Good Piano</h4>
              <p>Happy vibes for an upbeat morning.</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Feelin' Myself</h4>
              <p>The hip-hop playlist that's a whole mood...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Chill Tracks</h4>
              <p>Softer kinda dance</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Feel-Good Indie Rock</h4>
              <p>The best indie rock vibes - classic and...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>idk.</h4>
              <p>idk.</p>
            </div>
          </div>

          <hr />
        </div>
        <div className="spotify-playlists">
          <h2>Bảng xếp hạng </h2>
          <div className="list">
            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Mood Booster</h4>
              <p>Get happy with today's dose of feel-good...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Feelin' Good</h4>
              <p>Feel good with this positively timeless...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Dark & Stormy</h4>
              <p>Beautifully dark, dramatic tracks.</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Feel Good Piano</h4>
              <p>Happy vibes for an upbeat morning.</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Feelin' Myself</h4>
              <p>The hip-hop playlist that's a whole mood...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Chill Tracks</h4>
              <p>Softer kinda dance</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>Feel-Good Indie Rock</h4>
              <p>The best indie rock vibes - classic and...</p>
            </div>

            <div className="item">
              <img src={albumImg.src} alt="Album"/>
              <div className="play">
                <span className="fa fa-play"></span>
              </div>
              <h4>idk.</h4>
              <p>idk.</p>
            </div>
          </div>

          <hr />
        </div>

        
      </div>

      
      </div>
    );
  }