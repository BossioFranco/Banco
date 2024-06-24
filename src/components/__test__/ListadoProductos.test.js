import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProductList from '../../pages/productList/ProductList';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useFocusEffect: jest.fn(),
}));

describe('<ProductList />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading indicator initially', () => {
    const { getByTestId } = render(<ProductList />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders products after successful fetching', async () => {
    const mockData = {
      data: [
        {
          id: '111',
          name: 'edited',
          description: 'works or not',
          logo: 'logo.png',
          date_release: '2024-08-08',
          date_revision: '2025-08-08',
        },
      ],
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const { getByText } = render(<ProductList />);

    await waitFor(() => {
      expect(getByText('edited')).toBeTruthy();
    });
  });

  it('displays error message on fetch failure', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Failed to fetch'));

    const { getByText } = render(<ProductList />);

    await waitFor(() => {
      expect(getByText('Error loading data: Failed to fetch')).toBeTruthy();
    });
  });

  it('filters products based on search input', async () => {
    const mockData = {
      data: [
        {
          id: '99988',
          name: 'EDITED',
          description: 'IT WORKEDDD',
          logo: 'Logo',
          date_release: '2024-08-08',
          date_revision: '2025-08-08',
        },
      ],
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const { getByPlaceholderText, getByText, queryByText } = render(<ProductList />);

    await waitFor(() => {
      expect(getByText('EDITED')).toBeTruthy();
    });

    fireEvent.changeText(getByPlaceholderText('Search by name...'), 'EDITED');

    await waitFor(() => {
      expect(getByText('EDITED')).toBeTruthy();
      expect(queryByText('Product 1')).toBeFalsy();
    });
  });

  it('navigates to Register screen on pressing "Add"', () => {
    const { getByText } = render(<ProductList />);

    fireEvent.press(getByText('Add'));

    expect(useNavigation().navigate).toHaveBeenCalledWith('Register', { state: 'create' });
  });
});