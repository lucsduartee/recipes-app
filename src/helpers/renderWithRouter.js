import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export default function renderWithRouter(component, initialEntries = ['/']) {
  const history = createMemoryHistory({ initialEntries });
  return ({
    ...render(<Router history={ history }>{component}</Router>),
    history,
  });
}
