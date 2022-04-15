import React from 'react';
import {
  fireEvent,
  getByPlaceholderText,
  getByTestId,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import Dashboard from './Dashboard';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('dashboard', () => {
  let container = document.createElement('div');

  beforeEach(() => {
    jest.clearAllMocks();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('after search input change, api is being called again with correct url', async () => {
    const response = {
      data: {
        info: { next: null },
        results: [{ name: 'Rick', image: '', id: 1, status: 'Alive' }],
      },
    };
    mockedAxios.get.mockResolvedValue(response);

    await act(async () => {
      createRoot(container).render(<Dashboard />);
    });

    const input = getByPlaceholderText(container, 'Search');

    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: 'Rick',
        },
      });
    });

    await waitFor(async () => {
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toBeCalledWith(
        `${process.env.REACT_APP_RICK_AND_MORTY_API}/character`,
        { params: { name: 'Rick', page: 1, status: '' } }
      );
    });
  });

  it('after alive status radio button click, api is being called again with correct url', async () => {
    const root = createRoot(container);
    const response = {
      data: {
        info: { next: null },
        results: [{ name: 'Rick', image: '', id: 1, status: 'Alive' }],
      },
    };
    mockedAxios.get.mockResolvedValue(response);

    await act(async () => {
      root.render(<Dashboard />);
    });

    const aliveinput = getByTestId(container, 'aliveinput');

    await act(async () => {
      fireEvent.click(aliveinput);
    });

    await waitFor(async () => {
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toBeCalledWith(
        `${process.env.REACT_APP_RICK_AND_MORTY_API}/character`,
        { params: { name: '', page: 1, status: 'Alive' } }
      );
    });
  });

  it('after clicking Alive, then Dead radio button, api is being called 3 times with correct urls', async () => {
    const root = createRoot(container);
    const response = {
      data: {
        info: { next: null },
        results: [{ name: 'Rick', image: '', id: 1, status: 'Alive' }],
      },
    };
    mockedAxios.get.mockResolvedValue(response);

    await act(async () => {
      root.render(<Dashboard />);
    });

    const aliveinput = getByTestId(container, 'aliveinput');

    await act(async () => {
      fireEvent.click(aliveinput);
    });

    await waitFor(async () => {
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toBeCalledWith(
        `${process.env.REACT_APP_RICK_AND_MORTY_API}/character`,
        { params: { name: '', page: 1, status: 'Alive' } }
      );
    });

    const deadinput = getByTestId(container, 'deadinput');

    await act(async () => {
      fireEvent.click(deadinput);
    });

    await waitFor(async () => {
      expect(axios.get).toHaveBeenCalledTimes(3);
      expect(axios.get).toBeCalledWith(
        `${process.env.REACT_APP_RICK_AND_MORTY_API}/character`,
        { params: { name: '', page: 1, status: 'Dead' } }
      );
    });
  });
});
