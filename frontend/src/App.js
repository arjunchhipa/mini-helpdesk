import React from 'react';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import './App.css';

function App(){
  const refreshRef = React.useRef(null);

  return (
    <div className="container">
      <h1>Mini Helpdesk</h1>
      <div className="grid">
        <TicketForm onCreated={() => {
          // optional: trigger a global refresh by broadcasting a custom event
          window.dispatchEvent(new Event('ticketCreated'));
        }} />
        <TicketList />
      </div>
    </div>
  );
}

export default App;
