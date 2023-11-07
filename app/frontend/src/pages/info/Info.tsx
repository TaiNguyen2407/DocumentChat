import React, { useState } from "react";
import './Info.css'

const Info = () => {
    const [backendResponse, setBackendResponse] = useState('');
    const fetchUrl = "http://localhost:5000";
    const fetchDataFromBackend = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setBackendResponse(data.message);
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };
  
    return (
      <div className="landing-page">
        <button onClick={fetchDataFromBackend}>Fetch Hello World from Backend</button>
        <p>Backend Response: {backendResponse}</p>
      </div>
    )
}

export default Info;