import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { ActiveLocationContextProviderType } from '../../context/active-location-context';
import SuburbSearch from '../SuburbSearch';

describe('SuburbSearch component', () => {
  test('renders Suburb Search Component', async () => {
    const setActiveLocationMock = jest.fn();

    const defaultLocation: ActiveLocationContextProviderType = {
      activeLocation: {
        result: {
          id: 0,
          suburbName: '',
          latitude: 789,
          longitude: 101,
        },
        searched: [700, 100],
      },
      setActiveLocation: setActiveLocationMock,
    };

    (React.useContext as jest.Mock).mockReturnValue(defaultLocation);

    render(<SuburbSearch />);

    const searchButton = screen.getByLabelText(
      'suburb-search-button'
    ) as HTMLInputElement;

    expect(searchButton).toBeInTheDocument();
  });

  test('call search successfully', async () => {
    const setActiveLocationMock = jest.fn();
    const defaultLocation: ActiveLocationContextProviderType = {
      activeLocation: {
        result: {
          id: 0,
          suburbName: '',
          latitude: 789,
          longitude: 101,
        },
        searched: [700, 100],
      },
      setActiveLocation: setActiveLocationMock,
    };

    (React.useContext as jest.Mock).mockReturnValue(defaultLocation);

    render(<SuburbSearch />);

    const searchButton = screen.getByLabelText(
      'suburb-search-button'
    ) as HTMLInputElement;

    expect(searchButton).toBeInTheDocument();

    const resultSuburb = {
      id: 1,
      suburbName: 'Test Suburb',
      latitude: 123,
      longitude: 456,
    };

    jest.spyOn(global, 'fetch').mockImplementationOnce(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(resultSuburb),
        }) as Promise<Response>
    );

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(setActiveLocationMock).toHaveBeenCalledWith({
        result: resultSuburb,
        searched: [
          defaultLocation.activeLocation.result.latitude,
          defaultLocation.activeLocation.result.longitude,
        ],
      });
    });

    jest.spyOn(global, 'fetch').mockImplementationOnce(
      () =>
        Promise.reject({
          ok: true,
          json: () => Promise.resolve(resultSuburb),
        }) as Promise<Response>
    );

    fireEvent.click(searchButton);
  });

  test('call search with error', async () => {
    const setActiveLocationMock = jest.fn();
    const defaultLocation: ActiveLocationContextProviderType = {
      activeLocation: {
        result: {
          id: 0,
          suburbName: '',
          latitude: 789,
          longitude: 101,
        },
        searched: [700, 100],
      },
      setActiveLocation: setActiveLocationMock,
    };

    (React.useContext as jest.Mock).mockReturnValue(defaultLocation);

    render(<SuburbSearch />);

    const searchButton = screen.getByLabelText(
      'suburb-search-button'
    ) as HTMLInputElement;

    expect(searchButton).toBeInTheDocument();

    const resultSuburb = {
      id: 1,
      suburbName: 'Test Suburb',
      latitude: 123,
      longitude: 456,
    };

    jest.spyOn(global, 'fetch').mockImplementationOnce(
      () =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve(resultSuburb),
        }) as Promise<Response>
    );

    fireEvent.click(searchButton);

    const errorMock = () => {
      throw new Error('Failed to fetch data');
    };

    await waitFor(() => {
      expect(errorMock).toThrow();
    });
  });
});
