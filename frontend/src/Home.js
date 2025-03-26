import React, {useState} from "react";
import { useNavigate} from "react-router-dom";
import "./Home.css"; 

const Home = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const navigate = useNavigate();
    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleSearch = () => {
        // Navigate programmatically to ensure the search parameter is passed
        navigate(`/experiment?search=${encodeURIComponent(searchQuery)}`);
    };
    const handleKeyPress = (e) => {
        // Allow search on Enter key press
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (
        <div className="home-container">
            <header className="header">
                <div className="hamburger" onClick={togglePanel}>
                    &#9776;  {/* Hamburger icon (three lines) */}
                </div>
                <h1>LabSyncAI</h1>
            </header>
            
            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search your Experiment"
                    className="search-bar"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                />
                 <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>
            

            {/* Side Panel (Hidden by default, toggled with the hamburger menu) */}
            {isPanelOpen && (
                <div className="side-panel">
                    <ul>
                        <li>Lab Experiment Guidance</li>
                        <li>Safety Instructions</li>
                        <li>Lab Report Generation</li>
                        <li>Voice & Chat Interaction</li>
                        <li>Equipment Identification</li>
                        <li>AI-powered Tutoring</li>
                    </ul>
                </div>
            )}

            {/* Recent Activity Panel */}
            <div className="recent-activity">
                <h2>Your Recent Activities</h2>
                <div className="activity-list">
                    {/* Example activity, replace with dynamic content later */}
                    <div className="activity-item">Titration Experiment</div>
                    <div className="activity-item">Safety Guidelines for Titration</div>
                    <div className="activity-item">AI Tutoring: Chemical Reactions</div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2025 LabSyncAI. All rights reserved.</p>
            </footer>
        </div>
    );
};
export default Home;
