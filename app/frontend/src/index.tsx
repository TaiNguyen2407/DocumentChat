import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Chat from './pages/Chat';
import Info from './pages/Info';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* <Route index path='' element={<Chat />} /> */}
          <Route index element={<Navigate to="/chat/1" replace />} />
          <Route path='chat/:id' element={<Chat />} />
          <Route path='info' element={<Info />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


