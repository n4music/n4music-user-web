import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSignUp } from '@/contexts/SignUpContext';
import logoImg from '@/images/Logo.png';

export default function Step2() {
  const router = useRouter();
  const { signUpData, setSignUpData } = useSignUp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (pass: string) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasSpecialChar = /[#?!@$%^&*-]/.test(pass);
    const hasMinLength = pass.length >= 8;
    return { isValid: hasUpperCase && hasSpecialChar && hasMinLength, 
             checks: { hasUpperCase, hasSpecialChar, hasMinLength } };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validatePassword(password);
    if (!validation.isValid) {
      setError('Mật khẩu không đáp ứng yêu cầu');
      return;
    }

    // Chỉ lưu password vào context và chuyển step3
    setSignUpData({ ...signUpData, password });
    router.push('./step3');
  };

  const validation = validatePassword(password);

  return (
    <>
      <Head>
        <title>Tạo mật khẩu</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
      <div className="step2-wrapper">
        <div className="container-step2">
          <div className="logo-step2">
            <Image 
              src={logoImg.src}
              alt="Logo"
              width={500}
              height={300}
              priority
            />
          </div>

          <div className="header-step2">
            <h1>Tạo mật khẩu</h1>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group-step2">
              <label htmlFor="password">Mật khẩu</label>
              <div className="password-input-step2">
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu của bạn"
                />
                <i 
                  className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="requirements-step2">
              <p>Mật khẩu của bạn phải có ít nhất:</p>
              <ul>
                <li className={validation.checks.hasUpperCase ? 'valid' : ''}>
                  <i className={`fas ${validation.checks.hasUpperCase ? 'fa-check' : 'fa-times'}`}></i>
                  <p>1 chữ cái viết hoa</p>
                </li>
                <li className={validation.checks.hasSpecialChar ? 'valid' : ''}>
                  <i className={`fas ${validation.checks.hasSpecialChar ? 'fa-check' : 'fa-times'}`}></i>
                  <p>1 chữ số hoặc ký tự đặc biệt (ví dụ: # ? ! &)</p>
                </li>
                <li className={validation.checks.hasMinLength ? 'valid' : ''}>
                  <i className={`fas ${validation.checks.hasMinLength ? 'fa-check' : 'fa-times'}`}></i>
                  <p>8 ký tự</p>
                </li>
              </ul>
            </div>
            <button type="submit">Tiếp theo</button>
          </form>
          
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </>
  );
}