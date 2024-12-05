// components/ChoosePlaylist.tsx
import { useState } from 'react';
import Link from 'next/link';

interface ChoosePlaylistProps {
  isOpen: boolean;
  onClose: () => void;
  playlists: Array<{
    id: number;
    name: string;
    songCount: number;
    image: string;
  }>;
}

export default function ChoosePlaylist({ isOpen, onClose, playlists }: ChoosePlaylistProps) {
  if (!isOpen) return null;

  return (
    <div className="choose-playlist-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Chọn Playlist</h2>
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="playlists-grid">
          {playlists.map(playlist => (
            <div key={playlist.id} className="playlist-item">
              <img src={playlist.image} alt={playlist.name} />
              <div className="playlist-info">
                <h3>{playlist.name}</h3>
                <p>{playlist.songCount} bài hát</p>
              </div>
            </div>
          ))}
          
          <Link href="/playlist">
            <div className="create-new-playlist">
              <i className="fas fa-plus"></i>
              <span>Tạo playlist mới</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
