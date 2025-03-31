const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Philippine Language Map!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});