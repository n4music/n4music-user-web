
import React from 'react';
import Head from 'next/head';
import logoImg from '@/images/Logo.png';
import { useRouter } from 'next/router';

export default function Step4() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');  // This will redirect to index.tsx
  };

  return (
    <>
      <Head>
        <title>Bước cuối cùng</title>
        <meta name="description" content="Personal information page" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
      <div className="step4-wrapper">
        <div className="container-step4">
          <div className="logo-step4">
            <img src={logoImg.src} alt="Logo" />
          </div>
          
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <h2>Bước 3/3</h2>
          <h1>Xác minh email</h1>
          
          <form onSubmit={handleSubmit}>
            <h2>Hãy nhập mã số bạn nhận được từ email</h2>
            <input type="number" id="code" />
            <button type="submit">Hoàn tất</button>
          </form>
        </div>
      </div>
    </>
  );
}