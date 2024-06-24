import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterProduct from '../../pages/registerProduct/RegisterProduct';
import useProductNavigation from '../../pages/editProduct/components/hooks/useProductNavigation';
import useProductListData from '../../pages/productList/components/hooks/useProductListData';
import { validateProduct } from '../../components/ValidateProduct';

// Mocks
jest.mock('@env', () => ({
  REACT_NATIVE_APP_API_URL: 'https://example.com/api',
}));


jest.mock('../../hooks/useProductNavigation');
jest.mock('../../hooks/useProductListData');
jest.mock('../../components/ValidateProduct');

describe('RegisterProduct component', () => {
  // Mock data for testing
  const mockRouteParams = {
    product: {
      id: 1,
      name: 'Product 1',
      description: 'Description of Product 1',
      logo: 'logo.png',
      date_release: '2023-01-01',
      date_revision: '2023-02-01',
    },
    state: 'edit',
  };

  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  beforeEach(() => {
    // Reset mocks before each test

    useProductNavigation.mockReturnValue({
      navigation: mockNavigation,
      route: { params: mockRouteParams },
    });

    useProductListData.mockReturnValue({
      products: [],
      loading: false,
      error: null,
      refetchProducts: jest.fn(),
    });

    validateProduct.mockImplementation(() => ({})); // Mock validation function
  });

  it('renders RegisterProduct component correctly', () => {
    render(<RegisterProduct navigation={mockNavigation} route={{ params: mockRouteParams }} />);
    // Add assertions for rendering correctness
  });

  // Add more specific test cases as needed

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test case
  });
});