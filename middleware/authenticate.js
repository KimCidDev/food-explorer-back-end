const { verify } = require('jsonwebtoken');

const AppError = require('../utils/AppError');

const authConfig = require('../configs/auth');
const auth = require('../configs/auth');

function authenticate(request, response, next) {
  const { authHeader } = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT TOKEN não informado');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id)
    };

    return next();
  } catch {
    throw new AppError('JWT TOKEN inválido');
  }
}

module.exports = authenticate;
