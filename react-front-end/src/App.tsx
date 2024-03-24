import React from 'react';
import './App.css';
import SuburbSearch from './components/SuburbSearch';
import MapResult from './components/MapResult';
import ActiveLocationContextProvider from './context/active-location-context';

function App() {
  return (
    <div className="App">
      <ActiveLocationContextProvider>
        <SuburbSearch />
        <MapResult />
      </ActiveLocationContextProvider>
    </div>
  );
}

export default App;
