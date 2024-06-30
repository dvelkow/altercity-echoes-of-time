import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getCityStats = async () => {
  const response = await axios.get(`${API_BASE_URL}/city_stats`);
  return response.data;
};

export const getAvailableDecisions = async () => {
  const response = await axios.get(`${API_BASE_URL}/available_decisions`);
  return response.data;
};

export const applyDecision = async (decisionName) => {
  const response = await axios.post(`${API_BASE_URL}/apply_decision`, { decision_name: decisionName });
  return response.data;
};

export const timeTravel = async (year) => {
  const response = await axios.post(`${API_BASE_URL}/time_travel`, { year });
  return response.data;
};