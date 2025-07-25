import app from './index.js';

import connectDB from './config/db.js'
const PORT = process.env.PORT || 5000;

// Connect and run server
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
