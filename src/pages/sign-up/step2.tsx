import React from 'react';
import Head from 'next/head';

import logoImg from '@/images/Logo.png';
import { useRouter } from 'next/router';

export default function Step2() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('./step3');  // Using relative path
  };
  return (
    <>
      <Head>
        <title>Password Creation</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
      <div className="step2-wrapper">
        <div className="container-step2">
          <div className="logo-step2">
            <img src={logoImg.src} alt="Logo" />
          </div>
          <div className="divider-step2"></div>
          <div className="header-step2">
            <p className="step">Bước 1/3</p>
            <h1>Tạo mật khẩu</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group-step2">
              <label htmlFor="password">Mật khẩu</label>
              <div className="password-input-step2">
                <input type="password" id="password" placeholder="" />
                <i className="fas fa-eye-slash"></i>
              </div>
            </div>
            <div className="requirements-step2">
              <p>Mật khẩu của bạn phải có ít nhất</p>
              <ul>
                <li><p>1 chữ cái viết hoa</p> </li>
                <li><p>1 chữ số hoặc ký tự đặc biệt (ví dụ: # ? ! &)</p></li>
                <li><p>8 ký tự</p> </li>
              </ul>
            </div>
            <button type="submit">Tiếp theo</button>
          </form>
          
        </div>
      </div>
    </>
  );
}