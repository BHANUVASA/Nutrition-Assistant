import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewPlanPage() {
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleGeneratePlan = (e) => {
    e.preventDefault();
    // Pass the typed details onto the evaluation screen state
    navigate('/diet-plan', { state: { age, height, weight } });
  };

  return (
    <div style={{ background: 'linear-gradient(180deg, #ffd6e0 0%, #ffffff 100%)', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ backgroundColor: '#000000', color: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <b style={{ fontSize: '18px', cursor: 'pointer' }} onClick={() => navigate('/home')}>Nutri-Assist</b>
        <div style={{ fontSize: '14px', display: 'flex', gap: '25px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>Home</span>
          <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/new-plan')}>New Plan</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/diet-plan')}>My Diet Plan</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Logout</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)', width: '100%', maxWidth: '450px' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '22px', color: '#9f1239', textAlign: 'center' }}>Set Your Personalized Diet Plan</h2>
          
          <form onSubmit={handleGeneratePlan} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '5px' }}>Age</label>
              <input type="number" placeholder="e.g., 23" value={age} onChange={(e) => setAge(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '5px' }}>Height (cm)</label>
              <input type="number" placeholder="e.g., 170" value={height} onChange={(e) => setHeight(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '5px' }}>Weight (kg)</label>
              <input type="number" placeholder="e.g., 68" value={weight} onChange={(e) => setWeight(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#9f1239', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Generate Plan</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPlanPage;