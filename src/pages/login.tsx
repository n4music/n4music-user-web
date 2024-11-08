import React from 'react';
import Head from 'next/head';
import logoImg from '@/images/Logo.png'
import Link from 'next/link';

export default function Login() {
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
                <button className="btn phone-btn">
                    Tiếp tục bằng số điện thoại
                </button>
            </div>
            <div className="divider"></div>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email hoặc tên người dùng</label>
                    <input type="text" id="email" placeholder="Email hoặc tên người dùng" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <div className="password-input">
                        <input type="password" id="password" placeholder="Mật khẩu" />
                        <i className="fas fa-eye-slash"></i>
                    </div>
                </div>
                <button className="btn login-btn">Đăng nhập</button>
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