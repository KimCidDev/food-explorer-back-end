const express = require('express');

const api = express();
const PORT = 3333;

api.use(express.json());
api.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// Até aqui o código é só pegar o express, instanciar na memória, criar uma variável para a PORT e usar duas funções do express (dá pra ver essas funções listadas se tu der console.log(express))
