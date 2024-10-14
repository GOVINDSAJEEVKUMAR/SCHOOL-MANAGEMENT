import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, loginSuccess, setError } from '../../Redux/authSlice';
import GlobalApi from '../GlobalApi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading());

      const response = await axios.post(`${GlobalApi.baseUrl}/auth/login`, { email, password });

      if (response.data && response.data.accessToken && response.data.refreshToken) {
        // Store tokens in cookies
        document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=${60 * 60 * 24}; Secure; SameSite=Strict`;
        document.cookie = `refreshToken=${response.data.refreshToken}; path=/; max-age=${7 * 24 * 60 * 60}; Secure; SameSite=Strict`;

        // Dispatch login success to Redux
        dispatch(
          loginSuccess({
            user: response.data.user,
            token: response.data.accessToken,
          })
        );

        setLocalError('');
        dispatch(setError(null));

        const userRole = response.data.role;

        if (userRole === 'admin') {
          navigate('/dashboard');
        } else if (userRole === 'staff') {
          navigate('/home');
        } else if (userRole === 'librarian') {
          navigate('/book');
        }

        alert('Login successful');
      } else {
        setLocalError('Invalid login credentials');
      }
    } catch (err) {
      dispatch(setError('Login failed. Please check your credentials.'));
      setLocalError('Invalid login credentials');
    }
  };

  return (
    <div className='bg-[url("https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-no-repeat'>
      <div className="w-full h-screen font-sans bg-cover bg-landscape">
        <div className="container flex items-center justify-center flex-1 h-full mx-auto">
          <div className="w-full max-w-lg">
            <div className="leading-relaxed">
              <form onSubmit={handleLogin} className="max-w-sm p-20 m-auto rounded shadow-xl bg-white/55">
                <p className="mb-8 text-2xl font-light text-center text-gray-600">Login</p>
                {localError && <p className="text-red-500 text-center">{localError}</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="mb-2">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
