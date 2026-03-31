import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Auth: React.FC = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('+27800000001'); // Default test number
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInMock } = useAuth();
  const navigate = useNavigate();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await signInMock(phone, otp);
    if (success) {
      navigate('/auth/role');
    } else {
      setError('Invalid verification code. Try "123456" for the test number.');
    }
    setLoading(false);
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-[320px] flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tighter mb-2">
            {step === 'phone' ? 'Sign in with phone' : 'Verification Code'}
          </h2>
          <p className="text-text-secondary font-medium leading-relaxed">
            {step === 'phone'
              ? 'Enter your phone number to receive a verification code.'
              : `Enter the code sent to ${phone}`}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+27 12 345 6789"
                className="bg-surface border-none rounded-button py-4 px-5 text-text-primary text-lg font-bold shadow-inner"
              />
            </div>
            {error && <p className="text-error text-xs font-bold text-center">{error}</p>}
            <button type="submit" className="btn-primary py-4 text-lg">Send Verification Code</button>
            <p className="text-text-secondary text-[10px] text-center px-4 leading-normal font-medium">
              By continuing, you agree to our Terms of Service and Privacy Policy. Standard SMS rates apply.
            </p>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">OTP Code</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000 000"
                className="bg-surface border-none rounded-button py-4 px-5 text-text-primary text-2xl font-bold tracking-[0.5em] text-center shadow-inner"
              />
            </div>
            {error && <p className="text-error text-xs font-bold text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary py-4 text-lg disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="text-primary font-bold text-sm py-2"
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
