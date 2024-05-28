import { AppError, catchAsync } from '../../errors/index.js';
import {
  validateLogin,
  validateRegister,
  validateUpdate,
} from './users.schema.js';
import { UserServices } from './users_service.js';
import generateJWT from '../../config/plugins/generate-JWT.js';
import { verifyPassword } from '../../config/plugins/encrypted-password.js';

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
    return next(new AppError('This user does not exist', 404));
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('incorrect Email or Password', 401));
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

  const { user } = req;

  const updatedUser = await userService.updateUser(user, req.body);

  return res.status(200).json(updatedUser);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const user = await userService.findOneById(id)

  if (!user) {
    return next(new AppError('This user does not exist', 404));
  }

  await userService.deleteUser(user);

  return res.status(200).json();
});

export const findAllOrders = catchAsync(async (req, res, next) => {

  const { sessionUser: user } = req

  const orders = await orderService.findAllOrders(user?.id);

  return res.status(200).json(orders);
})

export const findOneOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const order = await orderService.findOneOrder(id)

  if (!order) {
    return next(new AppError(`Order whit id ${id} not found`, 404))
  }

  return res.status(200).json(order)
})


