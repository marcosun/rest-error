// 4XX Class
// 400
export const BAD_REQUEST = 'Bad Request';
// 401
export const UNAUTHORIZED = 'Unauthorized';

// 5XX Class
// 520
export const DATACENTER_ERROR = 'Datacenter Error';

/**
 * Return rest error handler factory
 * The factory returns a function accepts four arguments
 * This is a standard Connect error middleware
 * @param  {Object}   err - Error object
 * @param  {Object}   req - Request object
 * @param  {Object}   res - Response object
 * @param  {Function} next - Call next middleware
 * @return {Object} - Close connection by sending an error response
 */
export default function restErrorHandler() {
  return function(err, req, res, next) {
    // Delegate to the default error handling mechanisms in Express
    // When the headers have already been sent to the client
    if (res.headersSent === true) return next(err);

    // If REST_ERROR_HANDLER is not defined, call next middleware
    if (err !== Object(err)
      || err.REST_ERROR_HANDLER !== Object(err.REST_ERROR_HANDLER)
    ) {
      return next(err);
    }

    switch (err.REST_ERROR_HANDLER.type) {
      case BAD_REQUEST: { // HTTP Status Code 400 Bad Request. 类型400: 请求参数错误
        const {
          field,
        } = err.REST_ERROR_HANDLER.payload;

        return res.status(400).send({
          code: 400, // The same as HTTP Status Code. 同HTTP Status Code
          status: BAD_REQUEST, // The same as HTTP Status Message. 同HTTP Status Message
          message: `Your request cannot be processed, please review API reference`, // Human readable error message. 人类可读报错信息
          details: [{ // Error detail. 详细报错信息
            field, // Bad request field. 出错字段名
            message: `${field} is not valid`, // Detailed error message relative to this field. 该字段人类可读报错信息
          }],
        });
      }
      case UNAUTHORIZED: // HTTP Status Code 401 Unauthorized. 类型401: 未经授权(未登录)
        return res.status(401).send({
          code: 401,
          status: UNAUTHORIZED,
          message: 'Invalid credentials',
        });
      // case Forbidden: // HTTP Status Code 403 Forbidden. 类型403: 未经授权(权限不够,账户名密码错误,不应当重复尝试)
      case DATACENTER_ERROR: // Customised HTTP Status Code 520 Datacenter Error. 类型520: 数据中心崩溃
        res.statusMessage = DATACENTER_ERROR;
        return res.status(520).send({
          code: 520,
          status: DATACENTER_ERROR,
          message: 'Datacenter is not responding as expected',
        });
      default:
        return next(err);
    }
  };
}
