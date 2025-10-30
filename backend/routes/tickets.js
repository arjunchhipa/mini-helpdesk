const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Create ticket
router.post('/', async (req, res) => {
  try {
    const { name, issue, priority } = req.body;
    const ticket = new Ticket({ name, issue, priority });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tickets (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { status, priority, sort = '-createdAt' } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tickets = await Ticket.find(filter).sort(sort);
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update ticket status (admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Open','In Progress','Closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
