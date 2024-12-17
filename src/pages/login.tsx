import React from 'react';
import Head from 'next/head';
import logoImg from '@/images/Logo.png'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import defaultUserImg from '@/images/User.png';
export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Đang gửi yêu cầu đăng nhập với:', formData);

    try {
      const response = await fetch('https://n4music-web-api.binnguyen.id.vn/v1/auth/sign-in', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Trạng thái phản hồi:', response.status);

      if (!response.ok) {
        throw new Error('Đăng nhập thất bại');
      }

      const data = await response.json();
      console.log('Dữ liệu phản hồi:', data);

      // Lưu token vào localStorage
      localStorage.setItem('token', data.token);
      
      // Lưu thông tin user mặc định nếu API không trả về
      const userInfo = {
        nickname: "Bin Nguyen",
        avatar: defaultUserImg.src
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      
      router.push('/');
    } catch (err) {
      console.error('Lỗi đăng nhập:', err);
      setError('Email hoặc mật khẩu không đúng');
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
      <div className="login-wrapper">
      <main>
        <div className="container-login">
            <div className="header-login">
                <img src={logoImg.src} alt="Logo" />
                <h1>Đăng nhập vào BeatLofi</h1>
            </div>
            <div className="social-buttons">
                <button className="btn google-btn">
                    <i className="fab fa-google"></i> Tiếp tục bằng Google
                </button>
                <button className="btn facebook-btn">
                    <i className="fab fa-facebook-f"></i> Tiếp tục bằng Facebook
                </button>

            </div>
            <div className="divider"></div>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email hoặc tên người dùng</label>
                    <input 
                        type="text" 
                        id="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Email hoặc tên người dùng" 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <div className="password-input">
                        <input 
                            type={showPassword ? "text" : "password"}
                            id="password" 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            placeholder="Mật khẩu" 
                        />
                        <i 
                            className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="btn login-btn">Đăng nhập</button>
            </form>
            <div className='forgot-pass'>
            <span>Quên mật khẩu</span>
            </div>
            <div className='sign-up'>
              <p>Bạn chưa có tài khoản? <Link href="/sign-up/step1"><span>Đăng kí</span></Link></p>
            </div>
        </div>
      </main>
      </div>
    </>
  );
}