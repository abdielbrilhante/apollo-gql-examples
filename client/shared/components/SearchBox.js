import * as React from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
  border: 1px solid #DADADA;
  border-radius: 8px;
  font-size: 18px;
  height: 48px;
  padding: 0 12px;
  width: 100%;
`;

export const SearchBox = ({ onInput }) => {
  const debounceTimer = React.useRef(null);

  const handleChange = React.useCallback((event) => {
    clearTimeout(debounceTimer.current);

    const value = event.currentTarget.value;
    debounceTimer.current = setTimeout(() => {
      onInput(value);
    }, 200);
  }, [onInput]);

  return (
    <SearchInput placeholder="Search hotels..." onChange={handleChange} />
  );
};
