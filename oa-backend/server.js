// Express app
const express = require('express');
const app = express();
const port = 5500;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Opposites-Attract Backend listening on port ${port}!`));