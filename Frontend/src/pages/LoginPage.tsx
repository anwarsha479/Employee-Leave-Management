import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');
    const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(
  email,
  password,
);

      localStorage.setItem(
        'token',
        response.data.accessToken,
      );

      navigate('/dashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Employee Leave Management</h2>

      <div className="card p-4 mt-4">
        <h4>Login</h4>

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;