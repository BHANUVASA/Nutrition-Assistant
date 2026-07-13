import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await axios.post('http://localhost:5000/api/register', {
        fullName,
        email,
        password
      });
      alert('Registration Successful! Please login.');
      navigate('/'); // Redirect to landing/login screen
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong during signup.');
    }
  };

  return (
    <div style={{ background: 'linear-gradient(180deg, #ffd6e0 0%, #ffffff 100%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', color: '#9f1239', textAlign: 'center' }}>Create Account</h2>
        
        {error && <div style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '13px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '5px' }}>Full Name</label>
            <input type="text" placeholder="Enter your name" value={fullName} onChange={(e) => setFullName(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '5px' }}>Email Address</label>
            <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '5px' }}>Password</label>
            <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#9f1239', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Sign Up</button>
        </form>
        <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <span onClick={() => navigate('/')} style={{ color: '#9f1239', fontWeight: 'bold', cursor: 'pointer' }}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;