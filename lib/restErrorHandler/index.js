// 4XX Class
// 400
export const BAD_REQUEST = 'Bad Request';
// 401
export const UNAUTHORIZED = 'Unauthorized';

// 5XX Class
// 520
export const DATACENTER_ERROR = 'Datacenter Error';

/**
 * Format error response
 * @param  {Object}   err - Error object
 * @param  {Object}   req - Request object
 * @param  {Object}   res - Response object
 * @param  {Function} next - Call next middleware
 * @return {Object} - Close connection by sending an error response
 */
export function restErrorHandler(err, req, res, next) {
  // Delegate to the default error handling mechanisms in Express
  // When the headers have already been sent to the client
  if (res.headersSent === true) return next(err);

  // If REST_ERROR_HANDLER is not defined, call next middleware
  if (err !== Object(err)
    || err.REST_ERROR_HANDLER !== Object(err.REST_ERROR_HANDLER)
  ) {
    return next(err);
  }

  switch (res.REST_ERROR_HANDLER.type) {
    case BAD_REQUEST: {
      const {
        field,
      } = res.REST_ERROR_HANDLER.payload;

      return res.status(400).send({
        code: 400,
        status: BAD_REQUEST,
        message: `Your request cannot be processed, 
          please review API reference`,
        details: [{
          field,
          message: `${field} is not valid`,
        }],
      });
    }
    case UNAUTHORIZED:
      return res.status(401).send({
        code: 401,
        status: UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    case DATACENTER_ERROR:
      res.statusMessage = DATACENTER_ERROR;
      return res.status(520).send({
        code: 520,
        status: DATACENTER_ERROR,
        message: 'Datacenter is not responding as expected',
      });
    default:
      return next(err);
  }
}
