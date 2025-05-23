// apiConfig.js

const apiIp = '192.168.18.68'; // 👈 YOUR PC's IP where Flask is running
const flaskPort = '5000';

const apiConnection = {
  apiIp: `http://${apiIp}/MatchMate`,              // ✅ For PHP APIs (if needed later)
  flaskBaseUrl: `http://${apiIp}:${flaskPort}`,    // ✅ For Python Flask APIs

  // ✅ Reusable function for Flask endpoints
  getFlaskUrl: (endpoint) => `http://${apiIp}:${flaskPort}/${endpoint}`,
};

export default apiConnection;