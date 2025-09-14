import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search employees by name, email, or phone..." }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  // Inline styles for the search bar
  const searchBarStyles = {
    flex: 1,
    minWidth: '300px',
    maxWidth: '500px'
  };

  const searchContainerStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };

  const searchIconStyles = {
    position: 'absolute',
    left: '1rem',
    color: '#64748b',
    fontSize: '1.1rem',
    pointerEvents: 'none',
    zIndex: 1
  };

  const searchInputStyles = {
    width: '100%',
    padding: '0.875rem 1rem 0.875rem 3rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '0.95rem',
    background: 'white',
    color: '#334155',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    outline: 'none'
  };

  const clearButtonStyles = {
    position: 'absolute',
    right: '1rem',
    background: 'none',
    border: 'none',
    color: '#64748b',
    cursor: 'pointer',
    padding: '0.25rem',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    fontSize: '1rem',
    fontWeight: 'bold'
  };

  return (
    <div style={searchBarStyles}>
      <div style={searchContainerStyles}>
        <span style={searchIconStyles}>🔍</span>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          style={searchInputStyles}
          onFocus={(e) => {
            e.target.style.borderColor = '#667eea';
            e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = 'none';
          }}
        />
        {query && (
          <button 
            onClick={handleClear}
            style={clearButtonStyles}
            onMouseEnter={(e) => {
              e.target.style.background = '#f1f5f9';
              e.target.style.color = '#334155';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = '#64748b';
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;