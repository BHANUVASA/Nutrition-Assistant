import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      // Check if backend flags the user as an Admin
      if (response.data.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
    }
  };

  const backgroundStyle = {
    background: 'linear-gradient(180deg, #ffd6e0 0%, #ffffff 100%)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '40px 30px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    textAlign: 'center',
    maxWidth: '450px',
    width: '90%'
  };

  return (
    <div style={backgroundStyle}>
      <div style={cardStyle}>
        <h1 style={{ color: '#9f1239', margin: '0 0 10px 0', fontSize: '28px' }}>Nutri-Assist</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '30px' }}>Your Personalized Diet and Nutrition Guide</p>

        {error && (
          <div style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '13px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '5px' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }} 
            />
          </div>
          
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '5px' }}>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }} 
            />
          </div>

          <button 
            type="submit" 
            style={{ width: '100%', padding: '12px', backgroundColor: '#9f1239', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', fontSize: '14px' }}
          >
            Login
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
          Don't have an account?{' '}
          <span 
            onClick={() => navigate('/register')} 
            style={{ color: '#9f1239', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;