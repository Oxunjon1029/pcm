import React, { Suspense } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import Loader from './components/Loader';

// Create a new instance of QueryClient
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Suspense fallback={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: "center",
              width: "100%",
              height: "100vh"
            }}>
            <Loader size="60" />
          </div>}>
          <App />
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>
);


