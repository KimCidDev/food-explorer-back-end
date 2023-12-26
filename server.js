const express = require('express');
const routes = require('./routes');

const api = express();
const PORT = 5555;

api.use(express.json());
api.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

api.use(routes);
