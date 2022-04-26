import { getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Main', () => {
  it('should render list of initial pokemon, and search for typed pokemon', async () => {
    render(
      <>
        <App />
      </>
    );
    //find the loading text
    screen.findByText(/loading/i);
    //find initial list
    const pokeList = await screen.findByRole('list');
    //make sure the list matches the default return amount from api call
    expect(pokeList.children.length).toEqual(20);
    //typing search for pikachu
    const search = screen.getByPlaceholderText('Search By Name');
    userEvent.type(search, 'pika');
    //initiating search with click
    const button = screen.getByRole('button', { name: /search/i });
    userEvent.click(button);

    const query = await screen.findByText(/pikachu/i);

    expect(query).toBeInTheDocument();
  });
});
