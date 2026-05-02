import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

import { API_URL } from '../services/api';

type Step = 'email' | 'otp' | 'password';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('OTP sent to your email address');
        setStep('otp');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify-reset-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('OTP verified successfully');
        setStep('password');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Password reset successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('OTP resent to your email address');
      } else {
        setError(data.message || 'Failed to resend OTP');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cream-light min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Back Link */}
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-[#5C3317] hover:underline mb-6"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        {/* Title */}
        <h1 
          className="text-center text-3xl md:text-4xl mb-2"
          style={{ 
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            color: '#5C3317'
          }}
        >
          {step === 'email' && 'Forgot Password'}
          {step === 'otp' && 'Enter OTP'}
          {step === 'password' && 'Create New Password'}
        </h1>
        <p className="text-center text-gray-500 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
          {step === 'email' && 'Enter your email to receive a password reset OTP'}
          {step === 'otp' && 'Enter the 6-digit OTP sent to your email'}
          {step === 'password' && 'Create a new secure password for your account'}
        </p>

        {/* Form Card */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {success}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 'email' && (
            <form onSubmit={handleSendOTP}>
              <div className="mb-6">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2 tracking-wide"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#333' }}
                >
                  EMAIL ADDRESS <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5C3317]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  placeholder="Enter your registered email"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  background: 'linear-gradient(to right, #8B4513, #5C3317)',
                  letterSpacing: '1px'
                }}
              >
                {isSubmitting ? 'SENDING...' : 'SEND OTP'}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP}>
              <div className="mb-6">
                <label 
                  htmlFor="otp" 
                  className="block text-sm font-medium mb-2 tracking-wide"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#333' }}
                >
                  ENTER OTP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5C3317] text-center text-2xl tracking-[0.5em]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otp.length !== 6}
                className="w-full py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50 mb-4"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  background: 'linear-gradient(to right, #8B4513, #5C3317)',
                  letterSpacing: '1px'
                }}
              >
                {isSubmitting ? 'VERIFYING...' : 'VERIFY OTP'}
              </button>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isSubmitting}
                className="w-full py-3 text-[#5C3317] font-medium border border-[#5C3317] rounded-lg transition-colors disabled:opacity-50 hover:bg-[#FDF6ED]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Resend OTP
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 'password' && (
            <form onSubmit={handleResetPassword}>
              <div className="mb-5">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium mb-2 tracking-wide"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#333' }}
                >
                  NEW PASSWORD <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5C3317]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#5C3317] focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label 
                  htmlFor="confirmPassword" 
                  className="block text-sm font-medium mb-2 tracking-wide"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#333' }}
                >
                  CONFIRM PASSWORD <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5C3317]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#5C3317] focus:outline-none transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  background: 'linear-gradient(to right, #8B4513, #5C3317)',
                  letterSpacing: '1px'
                }}
              >
                {isSubmitting ? 'RESETTING...' : 'RESET PASSWORD'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
