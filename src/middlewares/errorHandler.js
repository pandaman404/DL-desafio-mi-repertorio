import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, _req, res, _next) => {
  console.error(err.stack);

  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;

  return res.status(status).json({
    error: err.message || 'Error interno en el servidor',
  });
};

export { errorHandler };
