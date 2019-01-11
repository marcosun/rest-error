import isNoid from './utils/isNoid';

/**
 * Return rest error handler factory.
 * The factory returns a function accepts four arguments.
 * This is a standard Connect error middleware.
 */
export default function restErrorHandlerFactory() {
  return function restErrorHandler(err, req, res, next) {
    /**
     * Delegate to the default error handling mechanisms in Express,
     * when the headers have already been sent to the client.
     */
    if (res.headersSent === true) return next(err);

    // If err.status is not defined, it is not what we would expect, call next middleware.
    if (err !== Object(err) || typeof err.status !== 'number') {
      return next(err);
    }

    switch (err.status) {
      /**
       * HTTP Status Code 400 Bad Request. 类型400: 请求参数错误
       */
      case 400: {
        const {
          /**
           * Code property can not be overridden. It must be defined by err.status.
           */
          code,
          /**
           * Define which field is invalid.
           */
          field,
          /**
           * Override details.message.
           */
          fieldMessage,
          /**
           * Override error message.
           */
          message,
          /**
           * Status property is overridden by message property.
           */
          status,
          /**
           * Override status message.
           */
          statusMessage,
          /**
           * Attach all other properties in response body.
           */
          ...other
        } = err;

        return res.status(400).json({
          /**
           * The same as HTTP Status Code. 同HTTP Status Code
           */
          code: 400,
          /**
           * The same as HTTP Status Message. 同HTTP Status Message
           */
          status: isNoid(statusMessage) ? 'Bad Request' : statusMessage,
          /**
           * Human readable error message. 人类可读报错信息
           */
          message: isNoid(message) ? 'Invalid request parameter.' : message,
          /**
           * Error detail. 详细报错信息
           */
          details: [{
            /**
             * Bad request field. 出错字段名
             */
            field,
            /**
             * Detailed error message relative to this field. 该字段人类可读报错信息
             */
            message: isNoid(fieldMessage) ? `${field} is invalid` : fieldMessage,
          }],
          ...other,
        });
      }
      /**
       * HTTP Status Code 401 Unauthorized. 类型401: 未经授权(未登录)
       */
      case 401: {
        const {
          /**
           * Code property can not be overridden. It must be defined by err.status.
           */
          code,
          /**
           * Override error message.
           */
          message,
          /**
           * Status property is overridden by message property.
           */
          status,
          /**
           * Override status message.
           */
          statusMessage,
          /**
           * Attach all other properties in response body.
           */
          ...other
        } = err;

        return res.status(401).json({
          /**
           * The same as HTTP Status Code. 同HTTP Status Code
           */
          code: 401,
          /**
           * The same as HTTP Status Message. 同HTTP Status Message
           */
          status: isNoid(statusMessage) ? 'Unauthorized' : statusMessage,
          /**
           * Human readable error message. 人类可读报错信息
           */
          message: isNoid(message) ? 'Invalid credentials' : message,
          ...other,
        });
      }
      /**
       * HTTP Status Code 403 Forbidden. 类型403: 权限不足
       */
      case 403: {
        const {
          /**
           * Code property can not be overridden. It must be defined by err.status.
           */
          code,
          /**
           * Override error message.
           */
          message,
          /**
           * Status property is overridden by message property.
           */
          status,
          /**
           * Override status message.
           */
          statusMessage,
          /**
           * Attach all other properties in response body.
           */
          ...other
        } = err;

        return res.status(403).json({
          /**
           * The same as HTTP Status Code. 同HTTP Status Code
           */
          code: 403,
          /**
           * The same as HTTP Status Message. 同HTTP Status Message
           */
          status: isNoid(statusMessage) ? 'Forbidden' : statusMessage,
          /**
           * Human readable error message. 人类可读报错信息
           */
          message: isNoid(message) ? 'Insufficient authority' : message,
          ...other,
        });
      }
      /**
       * HTTP Status Code 404 Not Found. 类型404: 未找到
       */
      case 404: {
        const {
          /**
           * Code property can not be overridden. It must be defined by err.status.
           */
          code,
          /**
           * Override error message.
           */
          message,
          /**
           * Status property is overridden by message property.
           */
          status,
          /**
           * Override status message.
           */
          statusMessage,
          /**
           * Attach all other properties in response body.
           */
          ...other
        } = err;

        return res.status(404).json({
          /**
           * The same as HTTP Status Code. 同HTTP Status Code
           */
          code: 404,
          /**
           * The same as HTTP Status Message. 同HTTP Status Message
           */
          status: isNoid(statusMessage) ? 'Not Found' : statusMessage,
          /**
           * Human readable error message. 人类可读报错信息
           */
          message: isNoid(message) ? 'Not Found' : message,
          ...other,
        });
      }
      /**
       * HTTP Status Code 500 Internal Server Error. 类型500: 服务器内部错误
       */
      case 500: {
        const {
          /**
           * Code property can not be overridden. It must be defined by err.status.
           */
          code,
          /**
           * Override error message.
           */
          message,
          /**
           * Status property is overridden by message property.
           */
          status,
          /**
           * Override status message.
           */
          statusMessage,
          /**
           * Attach all other properties in response body.
           */
          ...other
        } = err;

        return res.status(500).json({
          /**
           * The same as HTTP Status Code. 同HTTP Status Code
           */
          code: 500,
          /**
           * The same as HTTP Status Message. 同HTTP Status Message
           */
          status: isNoid(statusMessage) ? 'Internal Server Error' : statusMessage,
          /**
           * Human readable error message. 人类可读报错信息
           */
          message: isNoid(message) ? 'Internal Server Error' : message,
          ...other,
        });
      }
      /**
       * All other errors come into this handler.
       */
      default: {
        const {
          /**
           * Code property can not be overridden. It must be defined by err.status.
           */
          code,
          /**
           * Override error message.
           */
          message,
          /**
           * Status property is overridden by message property.
           */
          status,
          /**
           * Override status message.
           */
          statusMessage,
          /**
           * Attach all other properties in response body.
           */
          ...other
        } = err;

        return res.status(err.status).json({
          /**
           * The same as HTTP Status Code. 同HTTP Status Code
           */
          code: err.status,
          /**
           * The same as HTTP Status Message. 同HTTP Status Message
           * Since status code is not predictable, status message default to an empty string.
           */
          status: isNoid(statusMessage) ? '' : statusMessage,
          /**
           * Human readable error message. 人类可读报错信息
           */
          message: isNoid(message) ? '' : message,
          ...other,
        });
      }
    }
  };
}
