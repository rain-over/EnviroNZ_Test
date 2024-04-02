import { render, screen } from '@testing-library/react';
import React from 'react';
import ActiveLocationContextProvider, {
  ActiveLocationContextProviderType,
} from '../../context/active-location-context';
import MapResult from '../MapResult';

describe('MapResult', () => {
  test('renders map correctly with given markers and polyline', async () => {
    const setActiveLocationMock = jest.fn();

    const defaultLocation: ActiveLocationContextProviderType = {
      activeLocation: {
        result: {
          id: 0,
          suburbName: 'Suburb Name',
          latitude: 100,
          longitude: 101,
        },
        searched: [98, 99],
      },
      setActiveLocation: setActiveLocationMock,
    };

    (React.useContext as jest.Mock).mockReturnValue(defaultLocation);

    render(
      <ActiveLocationContextProvider>
        <MapResult />
      </ActiveLocationContextProvider>
    );

    const marker = screen.getAllByTestId('marker');
    const tooltip = screen.getAllByTestId('tooltip');
    const polyline = screen.getAllByTestId('polyline');

    // test markers
    expect(marker[0]).toHaveAttribute('data-position', '98,99');
    expect(marker[1]).toHaveAttribute('data-position', '100,101');

    //test tooltip
    expect(tooltip[0]).toHaveTextContent('[98, 99]');
    expect(tooltip[1]).toHaveTextContent('Suburb Name');

    // test polyline
    expect(polyline[0]).toHaveAttribute(
      'data-positions',
      '[[98,99],[100,101]]'
    );
  });
});
