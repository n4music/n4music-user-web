import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import logoImg from '@/images/Logo.png';
import { useRouter } from 'next/router';

export default function Step3() {
  const router = useRouter();

  const chuyenTrang = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('./step4');  
  };
  return (
    <>
      <Head>
        <title>Thông tin cá nhân</title>
        <meta name="description" content="Personal information page" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
      <div className="step3-wrapper">
        <div className="container-step3">
          <div className="logo-step3">
            <img src={logoImg.src} alt="Logo" />
          </div>
          
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <h2>Bước 2/3</h2>
          <h1>Thông tin về bản thân bạn</h1>
          
          <form onSubmit={chuyenTrang}>
            <div className="form-group">
              <label htmlFor="name">Biệt danh</label>
              <p className="hint">Tên này sẽ xuất hiện trên hồ sơ của bạn</p>
              <input type="text" id="name" />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Ngày sinh</label>
              <p className="hint">Nhập ngày tháng năm sinh của bạn</p>
              <div className="date-inputs">
                <input type="text" id="dob-day" placeholder="dd" />
                <select id="dob-month">
                  <option>Tháng</option>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
                <input type="text" id="dob-year" placeholder="YYYY" />
              </div>
            </div>

            <div className="form-group">
              <label>Giới tính</label>
              <p className="hint">Giới tính của bạn giúp chúng tôi cung cấp nội dung đề xuất phù hợp với bạn.</p>
              <div className="gender-options">
              <div className="radio-option" style={{ paddingLeft: '4px' }}>  
  <input type="radio" id="male" name="gender" />
  <label htmlFor="male" style={{ paddingLeft: '4px' }}>Nam</label>
</div>
<div className="radio-option">
  <input type="radio" id="female" name="gender" />
  <label htmlFor="female">Nữ</label>
</div>
                
              </div>
            </div>

            <button type="submit">Tiếp theo</button>
          </form>
        </div>
      </div>
    </>
  );
}