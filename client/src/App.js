import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Importing the pages
import ArtistProgressDash from './pages/ArtistProgressDash';
import CustomizableDash from './pages/CustomizableDash';
import MusicManagement from './pages/MusicManagement';
import UserManagement from './pages/UserManagement';
import TourManagement from './pages/TourManagement';
import Inbox from './pages/Inbox';
import Settings from './pages/Settings';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/home');
                const result = await response.text();
                setData(result);
            } catch (error) {
                console.error("There was an error fetching data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXV2N28zdzB5Z3JnYjkwdXV0OWU1eGkzaXhsbTE4ZjVvaTc0aDZ1dyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/0eYPYhA2MoMzLLWbqZ/giphy.gif" className="App-logo" alt="logo" />
                    <p>{ "Rolls Royce Still Uncle Philllll...Yeeaa"}</p>
                </header>

                <Routes>
                    <Route path="/calendar" element={<div>{data ? <ArtistProgressDash /> : "Loading..."}</div>} />
                    <Route path="/home" element={<div>{data ? <CustomizableDash /> : "Loading..."}</div>} />
                    <Route path="/music-admin" element={<div>{data ? <MusicManagement /> : "Loading..."}</div>} />
                    <Route path="/users" element={<div>{data ? <UserManagement /> : "Loading..."}</div>} />
                    <Route path="/tours" element={<div>{data ? <TourManagement /> : "Loading..."}</div>} />
                    <Route path="/inbox" element={<div>{data ? <Inbox /> : "Loading..."}</div>} />
                    <Route path="/settings" element={<div>{data ? <Settings /> : "Loading..."}</div>} />
                    <Route path="/" element={<div>{data ? data : "Loading..."}</div>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
