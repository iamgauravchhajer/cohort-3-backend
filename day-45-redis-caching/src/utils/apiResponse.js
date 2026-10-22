export const sendSuccess = (res, statusCode, message, data) => {
  const body = { success: true, message, data: data === undefined ? {} : data };
  return res.status(statusCode).json(body);
};
