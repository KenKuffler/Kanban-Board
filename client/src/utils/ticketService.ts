// src/utils/ticketService.ts
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import Auth from './auth';

const API_URL = "https://kanban-board-bqdl.onrender.com"; // Replace with your API base URL directly


// Function to retrieve all tickets
export const retrieveTickets = async (): Promise<TicketData[]> => {
  try {
    const response = await fetch(`${API_URL}/api/tickets/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return await response.json();
  } catch (error) {
    console.error('Error retrieving tickets:', error);
    return [];
  }
};

// Function to delete a ticket by ID
export const deleteTicket = async (ticketId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(`${API_URL}/api/tickets/${ticketId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete ticket');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return { message: 'Failed to delete ticket' };
  }
};

