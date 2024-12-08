import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import logoImg from '@/images/Logo.png'
import { useRouter } from 'next/router';
import { useSignUp } from '@/contexts/SignUpContext';

export default function SignUp() {
  const router = useRouter();
  const { signUpData, setSignUpData } = useSignUp();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Vui lòng nhập email hợp lệ');
      return;
    }

    // Chỉ lưu email vào context và chuyển step2
    setSignUpData({ ...signUpData, email });
    router.push('./step2');
  };

  return (
    <>
      <Head>
        <title>Đăng ký</title>
        <meta name="description" content="Sign up page" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        
      </Head>
      <div className="signup1-wrapper">
        <main>
          <div className="container-signup1">
            <div className="header-signup1">
            <img src={logoImg.src} alt="Logo" />
              <h1>Đăng ký để bắt đầu nghe</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Địa chỉ email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                />
                {error && <div className="error-message">{error}</div>}
              </div>
              
              <button type="submit" className="submit-btn">Tiếp theo</button>
            </form>
            <div className="divider">
              <hr/>
              <span>hoặc</span>
              <hr/>
            </div>
            <div className="social-buttons">
              <button className="social-btn">
                <i className="fab fa-google"></i>
                Đăng ký bằng Google
              </button>
              <button className="social-btn">
                <i className="fab fa-facebook"></i>
                Đăng ký bằng Facebook
              </button>
              
            </div>
            <div className="login-link">
              <p>Bạn đã có tài khoản? <Link href="/login">Đăng nhập tại đây.</Link></p>
            </div>
          </div>
        </main>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Email đã tồn tại</h2>
            <p>Email này đã được đăng ký. Vui lòng:</p>
            <div className="modal-buttons">
              
              <button 
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                Thử email khác
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}