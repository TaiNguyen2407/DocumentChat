import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/chat/Chat';
import Info from './pages/info/Info';
import Layout from './pages/layout/Layout';


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
          <Route index path='' element={<Chat />} />
          <Route path='info' element={<Info />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


