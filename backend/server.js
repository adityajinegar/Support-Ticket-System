const path = require('path');
const express = require('express');
var cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Connect to databse
connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello');
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// // Serve Frontend
// if (process.env.NODE_ENV === 'production') {
//   // Set build folder as static
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(__dirname, '../frontend', 'build', 'index.html'),
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Welcome to the Support Desk API' });
//   });
// }

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
