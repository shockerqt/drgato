import { render, screen } from '@testing-library/react';
import { Layout } from '.';
import {
  MemoryRouter,
  Routes,
  Route,
} from 'react-router-dom';

describe('when rendered Layout', () => {

  it('should render this links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Categorías/)
    ).toBeInTheDocument();

  });

});
