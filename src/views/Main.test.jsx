import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from '../App';

describe('Main', () => {
  it('should render list of initial pokemon, and search for typed pokemon', async () => {
    render(
      <>
        <App />
      </>
    );
    screen.findByText(/loading/i);
    // await waitForElementToBeRemoved(screen.queryByText(/loading/i));
    const pokeList = await screen.findByRole('list');
    screen.debug();

    expect(pokeList.children.length).toEqual(20);
  });
});
