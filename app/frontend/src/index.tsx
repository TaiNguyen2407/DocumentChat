import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Chat from "./pages/Chat";
import Info from "./pages/Info";
import DocumentChat from "./pages/DocumentChat";
import Login from "./pages/Login";
import { fetchFromBrowserMemory } from "./utils/browserMemory";
import { User } from "./models/user";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      const data = fetchFromBrowserMemory("user");
      if (data !== null) {
        const user = JSON.parse(data);
        setLoggedInUser(user);
      }
    };
    try {
      fetchData();
    } catch (e) {
      console.warn("Fetching logged in user error: ", e);
    }
  }, []);

  if (!loggedInUser) {
    return <Login />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to="/chat/1" replace />} />
          <Route path='chat/:id' element={<Chat />} />
          <Route path='info' element={<Info />} />
          <Route path="documentChat" element={<DocumentChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
