import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Players from '../src/app/players/page';

const mock = new MockAdapter(axios);

describe('Players Component', () => {
  beforeEach(() => {
    // Mock the API endpoint
    mock.onGet('/api/auth/match').reply(200, [
      {
        _id: '655d1d3c163ef69d82b99074',
        local: 'carla',
        emaillocal: 'sdfs@gmail.com',
        visitante: 'misas',
        emailvisitante: 'sdsafs@gmail.com',
        date: '2023-11-01',
        time: '16:15',
        place: 'barranquilla',
      },
      // Add more mock data if needed
    ]);
  });
  
  it('should render players', async () => {
    render(<Players />);

    // Use findByText with a regular expression to wait for the text to appear
    const playerText = await screen.findByText(/carla/i);

    // Check if the player information is rendered
    expect(playerText).toBeInTheDocument();
  });
});
