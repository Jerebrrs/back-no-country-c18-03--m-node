import jwt from 'jsonwebtoken';
import { envs } from '../../config/enviroments/enviroments.js';
import { AppError } from '../../errors/appError.js';
import { errorMessagesUsers } from '../../common/utils/errorsMessages.js';

export const authenticateEntiti = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return next(new AppError(errorMessagesUsers.userToken, 401));
  }

  try {
    const decoded = jwt.verify(token, envs.SECRET_JWD_SEED);
    req.sessionUser = decoded;
    next();
  } catch (error) {
    return next(new AppError(errorMessagesUsers.userTokenOwner, 401));
  }
};
