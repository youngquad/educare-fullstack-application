import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { token } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMessage('Passwords do not match');
    }

    try {
      await axios.post(`/api/auth/reset-password/${token}`, { password });
      setMessage('Password reset successfully!');
      setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className="auth-form">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
