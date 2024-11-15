import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

import auth from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [sortCriterion, setSortCriterion] = useState<string>('status'); // Default sort by status
  const [filterStatus, setFilterStatus] = useState<string>(''); // For filtering

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
      auth.recordActivity("User checked login status and is logged in.");
    } else {
      auth.recordActivity("User checked login status and is not logged in.");
    }
  };

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

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      auth.recordActivity(`Deleted ticket with ID: ${ticketId}`);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriterion(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value);
  };

  const sortedAndFilteredTickets = () => {
    let filteredTickets = tickets;

    // Filter tickets based on selected status
    if (filterStatus) {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === filterStatus);
    }

    // Sort tickets based on selected criterion
    return filteredTickets.sort((a, b) => {
      if (sortCriterion === 'status') {
        return (a.status || '').localeCompare(b.status || ''); 
      } else if (sortCriterion === 'priority') {
        return (a.priority || 0) - (b.priority || 0);
      } else if (sortCriterion === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      }
      return 0; // Default case to maintain the current order
    });
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {
        !loginCheck ? (
          <div className='login-notice'>
            <h1>
              Login to create & view tickets
            </h1>
          </div>
        ) : (
          <div className='board'>
            <button type='button' id='create-ticket-link'>
              <Link to='/create'>New Ticket</Link>
            </button>

            {/* Sorting and Filtering UI */}
            <div className='filter-sort'>
              <label htmlFor='filter'>Filter by Status:</label>
              <select id='filter' onChange={handleFilterChange} value={filterStatus}>
                <option value=''>All</option>
                {boardStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>

              <label htmlFor='sort'>Sort by:</label>
              <select id='sort' onChange={handleSortChange} value={sortCriterion}>
                <option value='status'>Status</option>
                <option value='priority'>Priority</option>
                <option value='name'>Name</option>
              </select>
            </div>

            <div className='board-display'>
              {boardStates.map((status) => {
                const filteredAndSortedTickets = sortedAndFilteredTickets().filter(ticket => ticket.status === status);
                return (
                  <Swimlane
                    title={status}
                    key={status}
                    tickets={filteredAndSortedTickets}
                    deleteTicket={deleteIndvTicket}
                  />
                );
              })}
            </div>
          </div>
        )
      }
    </>
  );
};

export default Board;
