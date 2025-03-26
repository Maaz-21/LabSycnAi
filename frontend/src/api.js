import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {'Content-Type': 'application/json'}
});
export const searchMethods = async (searchQuery) => {
  try {
    const experiments = await API.get('/experiments');
    
    const filteredExperiments = experiments.data.filter(experiment => 
      experiment.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredExperiments;
  } catch (error) {
    console.error("Error fetching methods:", error);
    return [];
  }
};
export const getMethodsByExperiment = async (experimentName) => {
  try {
    const response = await API.get(`/experiment/${experimentName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching methods:", error);
    return [];
  }
};
export const getMethodDetails = async (methodName) => {
  try {
    const response = await API.get(`/method/${methodName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching method details:", error);
    return null;
  }
};

export const generateLabManual = async (methodName) => {
  try {
    const method = await API.get(`/method/${methodName}`);
    return method.data;
  } catch (error) {
    console.error("Error generating lab manual:", error);
    return "Lab manual could not be generated.";
  }
};

export const chatWithAssistant = async (chatHistory, userInput) => {
  // Placeholder for AI chat functionality
  // In a real application, this would be replaced with an actual AI API call
  const responses = [
    "Could you clarify your question about the experiment?",
    "That's an interesting point about the experimental method.",
    "Let me help you understand the process better.",
    "The key steps involve careful measurement and observation.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const improveYield = async (expectedYield, actualYield) => {
  // Placeholder for yield improvement suggestions
  const suggestions = [
    "Ensure precise measurements of reactants.",
    "Check the purity of your chemicals.",
    "Maintain consistent temperature during the experiment.",
    "Minimize loss during transfer of materials.",
  ];
  
  return suggestions[Math.floor(Math.random() * suggestions.length)];
};