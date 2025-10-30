const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issue: { type: String, required: true },
  priority: { type: String, enum: ['Low','Medium','High'], default: 'Low' },
  status: { type: String, enum: ['Open','In Progress','Closed'], default: 'Open' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', TicketSchema);
