const express = require('express');
const router = express.Router();
const {
  getTickets,
  getSingleTicket,
  createTickets,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTickets).post(protect, createTickets);

router
  .route('/:id')
  .get(protect, getSingleTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
