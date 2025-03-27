import { useState } from 'react';
import styled from 'styled-components';
import { Map } from './components/Map';
import { SearchBar } from './components/SearchBar';
import { useBus } from './contexts/BusContext';

const AppContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { buses, selectedBus, setSelectedBus } = useBus();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    // Aqui você pode adicionar a lógica de busca
    console.log('Buscando:', value);
  };

  const filteredBuses = buses.filter(bus =>
    bus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppContainer>
      <SearchBar onSearch={handleSearch} />
      <Map />
    </AppContainer>
  );
}

export default App;