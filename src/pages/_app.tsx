import { useState } from 'react';
import "@/styles/globals.css"
import "@/styles/login.css"
import "@/styles/step1.css"
import '@/styles/step2.css'
import '@/styles/step3.css'

import '@/styles/list.css'
import '@/styles/play.css'
import '@/styles/playbar.css'
import '@/styles/create-playlist.css'
import '@/styles/dow-like.css'
import '@/styles/playlist.css'
import '@/styles/playAI.css'
import '@/styles/chooseplaylist.css'
import '@/styles/userprofile.css'
import '@/styles/UserMenu.css'
import type { AppProps } from "next/app"
import Playbar from '@/components/playbar'
import { SignUpProvider } from '@/contexts/SignUpContext';

export default function App({ Component, pageProps }: AppProps) {
  const [isPlaybarVisible, setPlaybarVisible] = useState(false);

  return (
    <SignUpProvider>
      <Component {...pageProps} onShowPlaybar={() => setPlaybarVisible(true)} />
      <Playbar 
        isVisible={isPlaybarVisible} 
        onClose={() => setPlaybarVisible(false)} 
      />
    </SignUpProvider>
  );
}
