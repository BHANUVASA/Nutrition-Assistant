const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data arrays for demo
let registeredUsers = [];
let dietPlans = [];
let meals = [];

// --- SIGNUP/REGISTER ENDPOINT ---
app.post('/api/register', (req, res) => {
  const { fullName, email, password } = req.body;
  
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Check if user already exists
  const userExists = registeredUsers.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'Email is already registered.' });
  }

  const newUser = { id: Date.now(), fullName, email, password };
  registeredUsers.push(newUser);
  
  console.log('User registered successfully:', newUser);
  res.status(201).json({ message: 'User registered successfully!' });
});

// --- LOGIN ENDPOINT ---
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Check for Admin override credentials
  if (email === 'admin@gmail.com' && password === 'admin123') {
    return res.json({ message: 'Admin login successful', isAdmin: true });
  }

  // Check against registered users
  const user = registeredUsers.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  res.json({ message: 'Login successful', isAdmin: false, user: { fullName: user.fullName, email: user.email } });
});

// --- EXISTING DIET PLAN ENDPOINTS ---
app.get('/api/diet-plans', (req, res) => res.json(dietPlans));
app.post('/api/diet-plans', (req, res) => {
  const newPlan = { id: Date.now(), ...req.body };
  dietPlans.push(newPlan);
  res.status(201).json(newPlan);
});
app.delete('/api/diet-plans/:id', (req, res) => {
  dietPlans = dietPlans.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: 'Plan deleted' });
});

// --- EXISTING MEAL ENDPOINTS ---
app.get('/api/meals', (req, res) => res.json(meals));
app.post('/api/meals', (req, res) => {
  const newMeal = { id: Date.now(), ...req.body };
  meals.push(newMeal);
  res.status(201).json(newMeal);
});
app.delete('/api/meals/:id', (req, res) => {
  meals = meals.filter(m => m.id !== parseInt(req.params.id));
  res.json({ message: 'Meal removed' });
});

app.listen(5000, () => {
  console.log('Nutrition Backend running on port 5000');
});