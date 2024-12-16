import { useState } from 'react';

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (playlistName: string) => void;
}

export default function CreatePlaylistModal({ isOpen, onClose, onSubmit }: CreatePlaylistModalProps) {
  const [playlistName, setPlaylistName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playlistName.trim()) {
      setError('Vui lòng nhập tên playlist');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onSubmit(playlistName);
      setPlaylistName('');
      onClose();
    } catch (err) {
      setError('Không thể tạo playlist. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
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
            onChange={(e) => {
              setPlaylistName(e.target.value);
              setError('');
            }}
            placeholder="Nhập tên playlist"
            autoFocus
            disabled={isLoading}
          />
          {error && <p className="error-message">{error}</p>}
          <div className="modal-buttons">
            <button type="button" onClick={onClose} disabled={isLoading}>
              Hủy
            </button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Đang tạo...' : 'Tạo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
