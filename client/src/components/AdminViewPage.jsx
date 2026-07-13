import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminViewPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Fetch submitted diet plans from the backend on mount
  useEffect(() => {
    fetchDietPlans();
  }, []);

  const fetchDietPlans = () => {
    axios.get('http://localhost:5000/api/diet-plans')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching data:', err));
  };

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:5000/api/diet-plans/${id}`)
      .then(() => {
        // Refresh local state list after removal
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(err => console.error('Error deleting record:', err));
  };

  return (
    <div style={{ background: 'linear-gradient(180deg, #ffd6e0 0%, #ffffff 100%)', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ backgroundColor: '#000000', color: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <b style={{ fontSize: '18px' }}>Admin Panel - User Suggestions</b>
        <button onClick={() => navigate('/')} style={{ backgroundColor: '#1e293b', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
          Logout
        </button>
      </div>

      <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          {users.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>No data metrics submitted yet.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '15px' }}>Email</th>
                  <th style={{ padding: '15px' }}>Age</th>
                  <th style={{ padding: '15px' }}>Height (cm)</th>
                  <th style={{ padding: '15px' }}>Weight (kg)</th>
                  <th style={{ padding: '15px' }}>BMI</th>
                  <th style={{ padding: '15px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '15px', color: '#0f172a' }}>{user.email}</td>
                    <td style={{ padding: '15px', color: '#475569' }}>{user.age}</td>
                    <td style={{ padding: '15px', color: '#475569' }}>{user.height}</td>
                    <td style={{ padding: '15px', color: '#475569' }}>{user.weight}</td>
                    <td style={{ padding: '15px', color: '#475569' }}>{user.bmi}</td>
                    <td style={{ padding: '15px' }}>
                      <button onClick={() => handleDeleteUser(user.id)} style={{ backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminViewPage;