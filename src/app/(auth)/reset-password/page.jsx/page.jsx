import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const ResetPasswordPage = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Verify token on page load
  useEffect(() => {
    if (!token) {
      setError("No reset token found. The link may be invalid or expired.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${API_URL}/api/auth/reset-password`, { token, newPassword });
      setMessage(response.data.message);
      setTimeout(() => router.push('/login'), 3000); // Redirect to login after 3 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
     return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
                <FaExclamationTriangle className="inline-block w-8 h-8 text-red-500 mb-4" />
                <h2 className="text-xl font-bold">Invalid Link</h2>
                <p className="text-gray-600 mt-2">This password reset link is either invalid or has expired. Please request a new one.</p>
            </div>
        </div>
     );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Reset Your Password</h2>
        
        {message ? (
          <div className="p-4 text-center text-green-700 bg-green-100 rounded-md">
            <FaCheckCircle className="inline-block w-6 h-6 mr-2" />
            {message}
            <p className="text-sm mt-2">Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
             <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <FaSpinner className="text-blue-500" />: 'Reset Password'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};