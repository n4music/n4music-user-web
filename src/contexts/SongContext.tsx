import React, { createContext, useState, useContext, useEffect } from 'react';

interface Song {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  records: {
    id: number;
    songId: number;
    file: string;
  }[];
}

interface SongContextType {
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;
}

const SongContext = createContext<SongContextType>({
  currentSong: null,
  setCurrentSong: () => {},
});

export function SongProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  useEffect(() => {
    console.log('Current song updated:', currentSong);
  }, [currentSong]);

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
}

export const useSong = () => useContext(SongContext); 