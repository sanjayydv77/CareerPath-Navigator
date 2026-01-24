// js/config.js
const config = {
    // Change this URL when you deploy your backend
    // For local development, keep it as http://localhost:5000
    // For production, change it to your Render/Railway URL (e.g., https://careerpath-api.onrender.com)
    
    // Automatically detect environment
    API_BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5000'
        : 'https://future-fit-backend-bgp9.onrender.com'
};