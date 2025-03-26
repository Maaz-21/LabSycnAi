import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { searchMethods, getMethodsByExperiment, getMethodDetails } from './api';
import './Experiment.css';

const Experiment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialSearchQuery = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [experiments, setExperiments] = useState([]);
  const [methods, setMethods] = useState([]);
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);


  // Fetch experiments when component mounts or search query changes
  useEffect(() => {
    const fetchExperiments = async () => {
      if (searchQuery) {
        setLoading(true);
        const fetchedExperiments = await searchMethods(searchQuery);
        setExperiments(fetchedExperiments);
        setLoading(false);
      }
    };
    fetchExperiments();
  }, [searchQuery]);
  useEffect(() => {
    const fetchMethods = async () => {
      if (selectedExperiment) {
        const experimentMethods = await getMethodsByExperiment(selectedExperiment.name);
        setMethods(experimentMethods);
      }
    };
    fetchMethods();
  }, [selectedExperiment]);
  useEffect(() => {
    const fetchMethodDetails = async () => {
      if (selectedMethod) {
        const methodDetails = await getMethodDetails(selectedMethod.method_name);
        setSelectedMethod(methodDetails);
      }
    };
    fetchMethodDetails();
  }, [selectedMethod]);

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Update URL search parameters
    const params = new URLSearchParams(location.search);
    params.set('search', query);
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  // Handle experiment selection
  const handleExperimentSelect = (experiment) => {
    setSelectedExperiment(experiment);
    setSelectedMethod(null);
  };

  // Handle method selection
  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  // Handle perform experiment
  const handlePerformExperiment = () => {
    localStorage.setItem('selectedMethod', selectedMethod.method_name);
    navigate('/implementation');
  };

  return (
    <div className="experiment-container">
      <header className="experiment-header">
        <h1>LabSyncAI</h1>
      </header>   

      {/* Experiments/Methods Section */}
      {loading ? (
        <div className="loading">Loading experiments...</div>
      ) : (
        <div>
          {/* Experiments Grid */}
          {!selectedExperiment && (
            <div className="methods-grid">
              {experiments.map(experiment => (
                <div 
                  key={experiment.name}
                  className="method-hexagon"
                  onClick={() => handleExperimentSelect(experiment)}
                >
                  <div className="method-content">
                    <h3>{experiment.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Methods Grid */}
          {selectedExperiment && !selectedMethod && (
            <div className="methods-grid">
              {methods.map(method => (
                <div 
                  key={method.method_name}
                  className="method-hexagon"
                  onClick={() => handleMethodSelect(method)}
                >
                  <div className="method-content">
                    <h3>{method.method_name}</h3>
                    <p>{method.elaboration}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Selected Method Details */}
          {selectedMethod && (
            <div className="method-details">
              <h2>{selectedMethod.method_name}</h2>
              <p>{selectedMethod.explanation}</p>
              <button 
                className="perform-button"
                onClick={handlePerformExperiment}
              >
                Perform Experiment
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Search Bar */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input"
          placeholder="Search Experiments or Methods"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default Experiment;