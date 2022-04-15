import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import Character from './Character';

describe('character', () => {
  let container = document.createElement('div');
  
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });
  
  it('character renders like it should', async () => {
    const root = createRoot(container);
    await act(async () => {
      root.render(<Character id={1} status="Alive" name="Stefan" image="" />);
    });
  });
});
