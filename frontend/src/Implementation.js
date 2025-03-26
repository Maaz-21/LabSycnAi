import React, { useState, useEffect } from "react";
import { generateLabManual, chatWithAssistant, improveYield } from "./api";
import "./Implementation.css";

const Implementation = () => {
  const methodName = localStorage.getItem('selectedMethod') || ''; // Get the selected method from localStorage

  // State variables
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [yieldInput, setYieldInput] = useState('');
  const [labManual, setLabManual] = useState(''); // Initially empty, will be filled on fetch
  const [expectedYield, setExpectedYield] = useState((Math.random() * 100).toFixed(2));
  const [yieldSuggestions, setYieldSuggestions] = useState('');
  const [loading, setLoading] = useState(true);


  // Fetch lab manual when the method changes
  useEffect(() => {
    const fetchLabManual = async () => {
      setLoading(true);
      if (methodName) {
        try {
          const response = await generateLabManual(methodName);
          console.log(response);
          if (response && response.lab_manual) {
            setLabManual(response.lab_manual); // Set lab manual content from the API response
          } else {
            console.error("Lab manual not found.");
            setLabManual('Lab manual not available.');
          }
        } catch (error) {
          setLoading(false);
          console.error("Error fetching lab manual:", error);
          setLabManual('Error loading lab manual.');
        }
      } else {
        console.error("No method name found.");
        setLabManual('No method selected.');
      }
    };
    fetchLabManual();
  }, [methodName]); // Re-fetch if methodName changes
  // Handle changes to lab manual content
  const handleManualChange = (e) => {
    setLabManual(e.target.value); // Update state with the new content
  };

  // Handle sending message to the chatbot
  const handleSendMessage = async () => {
    if (userInput.trim() === '') return; // Avoid sending empty messages

    const botResponse = await chatWithAssistant(chatHistory, userInput);
    setChatHistory([...chatHistory, { user: userInput, bot: botResponse }]);
    setUserInput('');
  };

  // Handle yield improvement suggestions
  const handleImproveYield = async () => {
    const suggestions = await improveYield(expectedYield, yieldInput);
    setYieldSuggestions(suggestions);
    setYieldInput('');
  };

  return (
    <div className="implementation-container">
      {/* Left Side - Lab Manual */}
      <div className="lab-manual">
        <h2>Experiment Manual for {methodName}</h2>
        {/* Make the lab manual editable by using a textarea */}
        <textarea
          className="document"
          value={labManual} // Using state to display the lab manual
          onChange={handleManualChange} // Allow editing of the lab manual
        />
      </div>

      {/* Right Side - Yield Analysis & Chatbot */}
      <div className="right-section">
        {/* Yield Analysis */}
        <div className="yield-analysis">
          <h3>Expected Yield Analysis</h3>
          <div className="yield-value">{expectedYield}%</div>
          <div className="yield-search">
            <input
              type="text"
              placeholder="Practical Yield Value"
              value={yieldInput}
              onChange={(e) => setYieldInput(e.target.value)}
            />
            <button onClick={handleImproveYield}>Submit</button>
          </div>
        </div>

        {yieldSuggestions && (
          <div className="yield-suggestions">
            <h4>Improvement Suggestions:</h4>
            <p>{yieldSuggestions}</p>
          </div>
        )}

        {/* Chatbot Section */}
        <div className="chatbot-section">
          <h2>Experiment Assistant</h2>
          <div className="chat-window">
            {chatHistory.length === 0 ? (
              <div className="placeholder-shape"></div>
            ) : (
              chatHistory.map((msg, index) => (
                <div key={index} className="chat-message">
                  <p><strong>You:</strong> {msg.user}</p>
                  <p><strong>Bot:</strong> {msg.bot}</p>
                </div>
              ))
            )}
          </div>

          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Ask about the experiment..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Implementation;
