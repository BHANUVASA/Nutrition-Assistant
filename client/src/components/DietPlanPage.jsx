import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DietPlanPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasSaved = useRef(false);
  
  const age = location.state?.age || 23;
  const height = location.state?.height || 170;
  const weight = location.state?.weight || 68;
  
  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

  // Automatically submit these values to our active backend on load
  useEffect(() => {
    if (!hasSaved.current) {
      hasSaved.current = true;
      axios.post('http://localhost:5000/api/diet-plans', {
        email: 'user_active@gmail.com', // Placeholder for current session user
        age,
        height,
        weight,
        bmi
      })
      .then(res => console.log('Metrics logged successfully:', res.data))
      .catch(err => console.error('Error logging metrics:', err));
    }
  }, [age, height, weight, bmi]);

  return (
    <div style={{ background: 'linear-gradient(180deg, #ffd6e0 0%, #ffffff 100%)', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ backgroundColor: '#000000', color: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <b style={{ fontSize: '18px', cursor: 'pointer' }} onClick={() => navigate('/home')}>Nutri-Assist</b>
        <div style={{ fontSize: '14px', display: 'flex', gap: '25px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>Home</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/new-plan')}>New Plan</span>
          <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/diet-plan')}>My Diet Plan</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Logout</span>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#9f1239', marginBottom: '25px' }}>Diet Suggestions</h2>
        
        <div style={{ backgroundColor: '#000000', color: 'white', display: 'flex', justifyContent: 'space-between', padding: '12px 20px', fontSize: '14px' }}>
          <span>Age: {age}</span>
          <span>Height: {height} cm</span>
          <span>Weight: {weight} kg</span>
        </div>

        <div style={{ 
          backgroundColor: '#9f1239', 
          color: 'white', 
          padding: '30px 40px', 
          fontSize: '14px', 
          lineHeight: '2.2', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start' 
        }}>
          <div>🔹 Timing: 3 meals and 2 snacks</div>
          <div>🔹 Calorie Intake: {weight * 24} kcal</div>
          <div>🔹 Daily Walk Target: 3-5 km</div>
          <div>🔹 Carbohydrate Needs: 130-210g</div>
          <div>🔹 Protein Needs: 48-65g</div>
          <div>🔹 Evaluated Body Mass Index (BMI): {bmi}</div>

          <div style={{ 
            backgroundColor: '#000000', 
            color: '#f8fafc', 
            padding: '15px', 
            marginTop: '20px', 
            borderRadius: '4px',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <strong>Suggestion:</strong> Increase calorie intake with a balanced diet...
          </div>
        </div>
      </div>
    </div>
  );
}

export default DietPlanPage;