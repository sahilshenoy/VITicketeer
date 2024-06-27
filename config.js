const dotenv = require('dotenv');
const path = require('path');

// Load .env.local file explicitly
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

console.log('Environment variables loaded:', process.env.MONGODB_URI); // Log to verify
