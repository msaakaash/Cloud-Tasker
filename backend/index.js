const express = require('express');
const app = express();
const taskRoutes = require('./routes/tasks');
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
