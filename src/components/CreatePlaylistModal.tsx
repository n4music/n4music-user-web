import { useState } from 'react';

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (playlistName: string) => void;
}

export default function CreatePlaylistModal({ isOpen, onClose, onSubmit }: CreatePlaylistModalProps) {
  const [playlistName, setPlaylistName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(playlistName);
    setPlaylistName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Tạo Playlist mới</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Nhập tên playlist"
            autoFocus
          />
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Hủy</button>
            <button type="submit">Tạo</button>
          </div>
        </form>
      </div>
    </div>
  );
}
