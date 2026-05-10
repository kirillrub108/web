require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const { getUsers, getUserById, createUser } = require('./controllers/UserController');
const { login, register } = require('./controllers/LoginController');

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());
app.use(express.static('static'));

// Роуты Users
app.get('/api/users', getUsers);
app.get('/api/users/:id', getUserById);
app.post('/api/users/create_users', createUser);

// Роуты Login
app.post('/api/login', login);
app.post('/api/register', register);

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
