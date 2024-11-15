// src/pages/Board.tsx
import { useEffect, useState } from 'react';
import { retrieveTickets, deleteTicket } from '../utils/ticketService';
import ErrorPage from './ErrorPage';
import { TicketData } from '../interfaces/TicketData';
import auth from '../utils/auth';

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
      auth.recordActivity("Fetched tickets successfully.");
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
      auth.recordActivity("Failed to fetch tickets.");
    }
  };

  const handleDelete = async (ticketId: number | null) => {
    if (ticketId === null) {
      console.error("Invalid ticket ID: cannot delete");
      return;
    }
    try {
      await deleteTicket(ticketId);
      setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
      auth.recordActivity(`Deleted ticket with ID: ${ticketId}`);
    } catch (error) {
      console.error('Failed to delete ticket:', error);
    }
  };

  useEffect(() => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
      fetchTickets();
    }
  }, []);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className='board'>
      {!loginCheck ? (
        <div className='login-notice'>
          <h1>Login to create & view tickets</h1>
        </div>
      ) : (
        <div>
          {tickets.map(ticket => (
            <div key={ticket.id}>
              <h3>{ticket.name}</h3>
              <p>{ticket.description}</p>
              <button onClick={() => handleDelete(ticket.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Board;




