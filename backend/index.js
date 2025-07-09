require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3302;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello :DDD');
});

require("./routes/index")(app)

// app.post('/api/auth/login', (req, res) => {
//     const { username, password } = req.body;
//     if (username === 'testuser' && password === 'password123') {
//         const user = { id: 1, username: 'testuser', role: 'admin' };
//         const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
//         return res.json({ token });
//     } else {
//         return res.status(401).json({ message: 'Invalid credentials' });
//     }
// });

// app.get('/api/users', authenticateToken, async (req, res) => {
//     try {
//         const [rows] = await pool.execute('SELECT id, name, email FROM users'); // Adjust columns as per your 'users' table
//         res.json(rows);
//     } catch (err) {
//         console.error('Error fetching users:', err.message);
//         res.status(500).json({ message: 'Error fetching users' });
//     }
// });

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});