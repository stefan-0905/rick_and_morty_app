import React from 'react';
import { findAllByTestId } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import { DashboardContext } from '../../contexts/DashboardProvider';
import CharacterList from './CharacterList';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('character list', () => {
  let container = document.createElement('div');

  beforeEach(() => {
    jest.clearAllMocks();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('after initial render, correct api call is being made', async () => {
    const root = createRoot(container);
    const response = {
      data: {
        info: { next: null },
        results: [{ name: 'Rick', image: '', id: 1, status: 'Alive' }],
      },
    };

    mockedAxios.get.mockResolvedValueOnce(response);

    await act(async () => {
      root.render(
        <DashboardContext.Provider
          value={{
            filters: {
              name: 'Rick',
              status: '',
              page: 1,
            },
            setFilter: (property, value) => {},
          }}
        >
          <CharacterList />
        </DashboardContext.Provider>
      );
    });

    expect(axios.get).toBeCalledWith(
      `${process.env.REACT_APP_RICK_AND_MORTY_API}/character`,
      { params: { name: 'Rick', page: 1, status: '' } }
    );

    const elems = await findAllByTestId(container, 'character');
    expect(elems.length).toEqual(1);
  });
});
