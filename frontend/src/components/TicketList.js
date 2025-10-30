import React, { useEffect, useState, useRef } from 'react';
import { fetchTickets, updateTicketStatus } from '../api';
import dayjs from 'dayjs';

export default function TicketList(){
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const timerRef = useRef(null);

  async function load(){
    setLoading(true);
    try{
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      const data = await fetchTickets(params);
      setTickets(data);
    }catch(err){
      console.error(err);
    }finally{ setLoading(false); }
  }

  useEffect(() => { load(); }, [statusFilter, priorityFilter]);

  useEffect(() => {
    if (autoRefresh){
      timerRef.current = setInterval(load, 5000); // poll every 5s
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [autoRefresh]);

  async function changeStatus(id, nextStatus){
    try{
      await updateTicketStatus(id, nextStatus);
      // optimistic reload
      load();
    }catch(err){ alert('Failed to update status'); }
  }

  return (
    <div className="card list">
      <div className="controls">
        <div>
          <label>Status</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
        </div>
        <div>
          <label>Priority</label>
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
            <option value="">All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="autorefresh">
          <label>Auto-refresh</label>
          <input type="checkbox" checked={autoRefresh} onChange={e => setAutoRefresh(e.target.checked)} />
        </div>
        <div>
          <button onClick={load}>Refresh now</button>
        </div>
      </div>

      <h3>Tickets</h3>

      {loading ? <p>Loading...</p> : (
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Issue</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t._id} className={t.status === 'Closed' ? 'closed' : ''}>
                <td>{t.name}</td>
                <td>{t.issue}</td>
                <td>{t.priority}</td>
                <td>{t.status}</td>
                <td>{dayjs(t.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                <td>
                  {t.status !== 'Open' && (
                    <button onClick={() => changeStatus(t._id, 'Open')}>Set Open</button>
                  )}
                  {t.status !== 'In Progress' && (
                    <button onClick={() => changeStatus(t._id, 'In Progress')}>Set In Progress</button>
                  )}
                  {t.status !== 'Closed' && (
                    <button onClick={() => changeStatus(t._id, 'Closed')}>Close</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
