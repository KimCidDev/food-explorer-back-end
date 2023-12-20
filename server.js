const express = require('express');

const api = express();
const PORT = 3333;

api.use(express.json());
api.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
