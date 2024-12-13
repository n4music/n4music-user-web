import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import defaultUserImg from '@/images/User.png';

interface UserMenuProps {
  isLoggedIn: boolean;
  userInfo: {
    name: string;
    avatar: string;
  } | null;
  onLogout: () => void;
}

export default function UserMenu({ isLoggedIn, userInfo, onLogout }: UserMenuProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState(userInfo);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isLoggedIn) {
        try {
          const token = localStorage.getItem('token');
          
          const response = await fetch('https://bill.binnguyen.id.vn/v1/members/me', {
            method: 'GET',
            headers: {
              'accept': '*/*',
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const userData = await response.json();
            
            if (userData.data && userData.data.member) {
              const newUserInfo = {
                name: userData.data.member.name || "User",
                avatar: userData.data.member.avatar || defaultUserImg.src
              };
              setUpdatedUserInfo(newUserInfo);
              localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
            }
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
    };

    fetchUserInfo();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="user-menu">
        <Link href="/sign-up/step1">
          <span className="signup-link">Đăng ký</span>
        </Link>
        <Link href="/login">
          <button type="button" className="login-button">Đăng nhập</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="user-menu">
      <div 
        className="user-profile"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Image 
          src={updatedUserInfo?.avatar || defaultUserImg.src}
          alt="Ảnh đại diện" 
          width={32} 
          height={32} 
          className="avatar"
        />
        <span className="name">{updatedUserInfo?.name}</span>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link href="/userprofile">Trang cá nhân</Link>
            <button onClick={onLogout}>Log out</button>
          </div>
        )}
      </div>
    </div>
  );
}