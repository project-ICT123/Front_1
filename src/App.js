// App.js
import React from 'react';
import HomePage from './page/Home';

function App() {
  return (
    <div className="text-center flex flex-col">
      <main className="flex-grow bg-blue-50">
        <HomePage />
      </main>
    </div>
  );
}

export default App;