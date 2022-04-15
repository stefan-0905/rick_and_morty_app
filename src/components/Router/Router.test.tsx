import React from 'react';
import { queryByText } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('router', () => {
  let container = document.createElement('div');

  beforeEach(() => {
    jest.clearAllMocks();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('initital render, loading component displayed', async () => {
    const root = createRoot(container);
    const response = {
      data: {
        info: { next: null },
        results: [{ name: 'Rick', image: '', id: 1, status: 'Alive' }],
      },
    };
    mockedAxios.get.mockResolvedValue(response);

    act(() => {
      root.render(
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      );
    });

    await act(async () => {
      const loading = queryByText(container, 'Loading...');
      expect(loading).not.toBeNull();
    });
  });

  it('something is loaded, loading component removed', async () => {
    const root = createRoot(container);
    const response = {
      data: {
        info: { next: null },
        results: [{ name: 'Rick', image: '', id: 1, status: 'Alive' }],
      },
    };
    mockedAxios.get.mockResolvedValue(response);

    await act(async () => {
      root.render(
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      );
    });

    await act(async () => {
      const loading = queryByText(container, 'Loading...');
      expect(loading).toBeNull();
    });
  });
});
