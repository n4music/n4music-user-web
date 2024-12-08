import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSignUp } from '@/contexts/SignUpContext';
import logoImg from '@/images/Logo.png';

export default function Step3() {
  const router = useRouter();
  const { signUpData } = useSignUp();
  const [nickname, setNickname] = useState('');
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [gender, setGender] = useState<number>(1);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Đăng ký tài khoản
      const signUpResponse = await fetch('https://bill.binnguyen.id.vn/v1/auth/sign-up', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signUpData.email,
          password: signUpData.password
        })
      });

      if (!signUpResponse.ok) {
        const errorData = await signUpResponse.json();
        throw new Error(errorData.msg || 'Đăng ký thất bại');
      }

      // 2. Đăng nhập để lấy token
      const loginResponse = await fetch('https://bill.binnguyen.id.vn/v1/auth/sign-in', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signUpData.email,
          password: signUpData.password
        })
      });

      const loginData = await loginResponse.json();
      if (!loginResponse.ok) {
        throw new Error('Đăng nhập thất bại');
      }

      // Lưu token
      localStorage.setItem('token', loginData.token);

      // 3. Cập nhật thông tin cá nhân
      const updateResponse = await fetch('https://bill.binnguyen.id.vn/v1/members/me', {
        method: 'PUT',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify({
          name: nickname,
          email: signUpData.email,
          phone: "",
          birthday: `${dob.year}-${dob.month}-${dob.day}T00:00:00.000Z`,
          cityId: 0,
          avatarId: "",
          gender: gender,
          deliveryInfo: {
            name: nickname,
            phone: "",
            address: "",
            cityId: 0,
            districtId: 0,
            wardId: 0
          }
        })
      });

      if (!updateResponse.ok) {
        throw new Error('Cập nhật thông tin thất bại');
      }

      // 4. Lưu thông tin user
      const userInfo = {
        nickname,
        avatar: "/default-avatar.png"
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      // 5. Chuyển về trang đăng nhập
      router.push('/login');
    } catch (err) {
      console.error('Chi tiết lỗi:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    }
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
            <Image 
              src={logoImg}
              alt="Logo"
              width={500}
              height={300}
              priority
            />
          </div>
          
          <h1>Thông tin về bản thân bạn</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nickname">Biệt danh</label>
              <p className="hint">Tên này sẽ xuất hiện trên hồ sơ của bạn</p>
              <input 
                type="text" 
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Ngày sinh</label>
              <div className="date-inputs">
                <input 
                  type="text" 
                  placeholder="DD"
                  value={dob.day}
                  onChange={(e) => setDob({...dob, day: e.target.value})}
                  required
                />
                <select 
                  value={dob.month}
                  onChange={(e) => setDob({...dob, month: e.target.value})}
                  required
                >
                  <option value="">Tháng</option>
                  {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                    <option key={month} value={month.toString().padStart(2, '0')}>
                      {month}
                    </option>
                  ))}
                </select>
                <input 
                  type="text" 
                  placeholder="YYYY"
                  value={dob.year}
                  onChange={(e) => setDob({...dob, year: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Giới tính</label>
              <div className="gender-options">
                <div className="radio-option">
                  <input 
                    type="radio" 
                    id="male" 
                    name="gender"
                    value="1"
                    checked={gender === 1}
                    onChange={(e) => setGender(Number(e.target.value))}
                    required
                  />
                  <label htmlFor="male">Nam</label>
                </div>
                <div className="radio-option">
                  <input 
                    type="radio" 
                    id="female" 
                    name="gender"
                    value="2"
                    checked={gender === 2}
                    onChange={(e) => setGender(Number(e.target.value))}
                  />
                  <label htmlFor="female">Nữ</label>
                </div>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}
            <button type="submit">Hoàn tất</button>
          </form>
        </div>
      </div>
    </>
  );
}