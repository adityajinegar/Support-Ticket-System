const path = require('path');
// const cors = require('cors');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Connect to databse
connectDB();

const app = express();

app.use(express.json({ extended: false }));
// app.use(express.urlencoded({ extended: false }));
// app.use(
//   cors(),
//   // {
//   // origin: [
//   //   'http://localhost:3000',
//   //   'https://support-ticket-system-static.onrender.com',
//   // ],
//   // }
// );

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
  );
}
// else
// {
//   app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Welcome to the Support Desk API' });
//   });
// }

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
