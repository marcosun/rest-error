# rest-error-handler
This project defines error formats of RESTful APIs. By following my guidline, one's APIs will be consistent to RESTful standards. This project is in its very early experimental stage, thus it is highly recommanded not to implement in production.

At the moment only three types of errors have formalised: 400, 401, 403, and 404.

## Installation

rest-error-handler is available as an [npm package](https://www.npmjs.com/package/rest-error-handler).

```sh
yarn add rest-error-handler
npm install --save rest-error-handler
```

## Docs

### Step One: Import rest-error-handler and attach it after all your routes

```javascript
// index.js
import express from 'express';
import restErrorHandler from 'rest-error-handler';

import login from './login.js';

const app = express();
app.get('/login', login);
app.use(restErrorHandler());
```

### Step Two: Create an error instance with status code and payload

```javascript
// login.js
export default function(req, res, next) {
    const {
        username,
    } = req.query;
    
    if (username === void 0) {
        const err = new Error('Bad Request');
        err.status = 400; // HTTP status code 400
        err.payload = {
            field: 'username', // Declare which field is required
        };
        return next(err);
    }
    
    if (username !== 'correct name') {
        const err = new Error();
        err.status = 401; // HTTP status code 401
        return next(err);
    }
    
    res.send('you are logged in');
}
```
