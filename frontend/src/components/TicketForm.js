import React, { useState } from 'react';
import { createTicket } from '../api';

export default function TicketForm({ onCreated }){
  const [name, setName] = useState('');
  const [issue, setIssue] = useState('');
  const [priority, setPriority] = useState('Low');
  const [loading, setLoading] = useState(false);

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    try{
      const ticket = await createTicket({ name, issue, priority });
      setName(''); setIssue(''); setPriority('Low');
      onCreated && onCreated(ticket);
    }catch(err){
      alert(err.message || 'Failed to create');
    }finally{ setLoading(false); }
  }

  return (
    <form onSubmit={submit} className="card form">
      <h3>Raise Ticket</h3>
      <label>Name</label>
      <input value={name} onChange={e => setName(e.target.value)} required />

      <label>Issue</label>
      <textarea value={issue} onChange={e => setIssue(e.target.value)} required />

      <label>Priority</label>
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
    </form>
  );
}
