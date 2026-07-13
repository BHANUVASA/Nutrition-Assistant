import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');

  // Fetch meals on component mount
  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = () => {
    axios.get('http://localhost:5000/api/meals')
      .then(res => setMeals(res.data))
      .catch(err => console.error('Error fetching meals:', err));
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!mealName || !calories) return;

    axios.post('http://localhost:5000/api/meals', {
      name: mealName,
      calories: parseInt(calories)
    })
    .then(res => {
      setMeals([...meals, res.data]);
      setMealName('');
      setCalories('');
    })
    .catch(err => console.error('Error adding meal:', err));
  };

  const handleDeleteMeal = (id) => {
    axios.delete(`http://localhost:5000/api/meals/${id}`)
      .then(() => {
        setMeals(meals.filter(meal => meal.id !== id));
      })
      .catch(err => console.error('Error deleting meal:', err));
  };

  // Calculate total consumed calories
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div style={{ background: 'linear-gradient(180deg, #ffd6e0 0%, #ffffff 100%)', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Navbar */}
      <div style={{ backgroundColor: '#000000', color: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <b style={{ fontSize: '18px', cursor: 'pointer' }} onClick={() => navigate('/home')}>Nutri-Assist</b>
        <div style={{ fontSize: '14px', display: 'flex', gap: '25px' }}>
          <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/home')}>Home</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/new-plan')}>New Plan</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/diet-plan')}>My Diet Plan</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Logout</span>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#9f1239', margin: '0 0 10px 0' }}>Welcome to Your Nutrition Dashboard</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Track your daily meals and stick to your calorie limitations.</p>
        </div>

        {/* Calorie Progress Card */}
        <div style={{ backgroundColor: '#9f1239', color: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(159,18,57,0.15)', textAlign: 'center' }}>
          <span style={{ fontSize: '14px', textTransform: 'uppercase', tracking: '1px' }}>Total Consumed Today</span>
          <h1 style={{ margin: '10px 0 0 0', fontSize: '36px' }}>{totalCalories} <span style={{ fontSize: '18px' }}>kcal</span></h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Add Meal Form */}
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h3 style={{ color: '#0f172a', margin: '0 0 20px 0', fontSize: '16px' }}>Log a Meal</h3>
            <form onSubmit={handleAddMeal} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '5px' }}>Meal Name</label>
                <input type="text" placeholder="e.g., Oatmeal, Grilled Chicken" value={mealName} onChange={(e) => setMealName(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '5px' }}>Calories (kcal)</label>
                <input type="number" placeholder="e.g., 350" value={calories} onChange={(e) => setCalories(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#000000', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>Add to Daily Log</button>
            </form>
          </div>

          {/* Today's Meals List */}
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ color: '#0f172a', margin: '0 0 20px 0', fontSize: '16px' }}>Today's Food Diary</h3>
            <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px' }}>
              {meals.length === 0 ? (
                <div style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center', marginTop: '40px' }}>No food items logged yet.</div>
              ) : (
                meals.map((meal) => (
                  <div key={meal.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '6px' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#334155', fontSize: '14px' }}>{meal.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{meal.calories} kcal</div>
                    </div>
                    <button onClick={() => handleDeleteMeal(meal.id)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>Remove</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;