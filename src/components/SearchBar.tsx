import { IconBus, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  z-index: 1000;
`;

const SearchInput = styled.div`
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    border: none;
    flex: 1;
    font-size: 16px;
    outline: none;
  }
`;

export const SearchBar = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchContainer>
      <SearchInput>
        <IconSearch size={20} color="#666" />
        <input
          type="text"
          placeholder="Buscar linha de ônibus..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            onSearch(e.target.value);
          }}
        />
        <IconBus size={20} color="#6B46C1" />
      </SearchInput>
    </SearchContainer>
  );
}; 