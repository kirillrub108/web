require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const { getUsers, getUserById } = require('./controllers/UserController');
const { login } = require('./controllers/LoginController');

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());
app.use(express.static('static'));

// Роуты Users
app.get('/api/users', getUsers);
app.get('/api/users/:id', getUserById);

// Роуты Login
app.post('/api/login', login);

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
