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
        const { field } = err.payload;

        return res.status(400).json({
          /**
           * The same as HTTP Status Code. 同HTTP Status Code
           */
          code: 400,
          /**
           * The same as HTTP Status Message. 同HTTP Status Message
           */
          status: 'Bad Request',
          /**
           * Human readable error message. 人类可读报错信息
           */
          message: 'Invalid request parameter.',
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
            message: `${field} is invalid`,
          }],
        });
      }
      /**
       * HTTP Status Code 401 Unauthorized. 类型401: 未经授权(未登录)
       */
      case 401:
        return res.status(401).json({
          /**
           * The same as HTTP Status Code. 同HTTP Status Code
           */
          code: 401,
          /**
           * The same as HTTP Status Message. 同HTTP Status Message
           */
          status: 'Unauthorized',
          /**
           * Human readable error message. 人类可读报错信息
           */
          message: 'Invalid credentials',
        });
      /**
       * HTTP Status Code 403 Forbidden. 类型403: 未经授权(权限不够,账户名密码错误,不应当重复尝试)
       */
      // case 403:
      /**
       * Customised HTTP Status Code 520 Datacenter Error. 类型520: 数据中心崩溃
       * This will deperecate soon.
       */
      case 520:
        res.statusMessage = 'Datacenter Error';
        return res.status(520).json({
          code: 520,
          status: 'Datacenter Error',
          message: 'Datacenter is not responding as expected',
        });
      default:
        return next(err);
    }
  };
}
