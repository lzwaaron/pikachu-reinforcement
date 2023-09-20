// client/components/App.tsx

import React from 'react';
import SearchPage from './SearchPage';

const App: React.FC = () => {
  return (
    <div>
      <h1>Restaurant Finder</h1>
      <SearchPage />
    </div>
  );
};

export default App;
