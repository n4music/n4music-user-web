import { createContext, useContext, useState } from 'react';

interface SignUpData {
  email: string;
  password: string;
}

interface SignUpContextType {
  signUpData: SignUpData;
  setSignUpData: (data: SignUpData) => void;
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export function SignUpProvider({ children }: { children: React.ReactNode }) {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    email: '',
    password: ''
  });

  return (
    <SignUpContext.Provider value={{ signUpData, setSignUpData }}>
      {children}
    </SignUpContext.Provider>
  );
}

export function useSignUp() {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error('useSignUp must be used within a SignUpProvider');
  }
  return context;
} 