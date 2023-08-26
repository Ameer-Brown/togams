import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Note: No need to specify the ".tsx" extension

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

