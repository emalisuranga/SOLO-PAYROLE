const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/data.routes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/data', dataRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
