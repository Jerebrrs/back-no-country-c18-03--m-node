import { AppError, catchAsync } from '../../errors/index.js';
import {
  validateLogin,
  validateRegister,
  validateUpdate,
} from './users.schema.js';
import { UserServices } from './users_service.js';
import generateJWT from '../../config/plugins/generate-JWT.js';
import { verifyPassword } from '../../config/plugins/encrypted-password.js';
import { errorMessagesUsers } from '../../common/utils/errorsMessages.js';
import { sucessMessage } from '../../common/utils/sucessMessage.js';

const userService = new UserServices();

export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const user = await userService.findUserByEmail(userData.email);

  if (!user) {
    return next(new AppError(errorMessagesUsers.userNotExist, 404));
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError(errorMessagesUsers.userEmailOrPassword, 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    user: {
      name: user.name,
      email: user.email
    },
  });
});

export const register = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateRegister(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const user = await userService.createUser(userData);

  const token = await generateJWT(user.id);

  return res.status(201).json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUpdate(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const { id } = req.params;

  const user = await userService.findOneById(id)

  if (!user) {
    return next(new AppError(errorMessagesUsers.userNotExist, 404))
  }

  const updatedUser = await userService.updateUser(user, userData);

  return res.status(200).json(sucessMessage.userUpdate, updatedUser);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const user = await userService.findOneById(id)

  if (!user) {
    return next(new AppError(errorMessagesUsers.userNotExist, 404));
  }

  await userService.deleteUser(user);

  return res.status(200).json(sucessMessage.userDelete);
});

export const findAllUser = catchAsync(async (req, res, next) => {
  const user = await userService.findAll()

  return res.status(200).json(user)
})

export const findOneUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.findOneById(id)

  if (!user) {
    return next(new AppError(errorMessagesUsers.userNotExist, 404))
  }

  return res.status(200).json(user)
})


