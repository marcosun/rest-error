# rest-error-handler
This project defines error formats of RESTful APIs. By following my guidline, one's APIs will be consistent to RESTful standards. This project is in its very early experimental stage, thus it is highly recommanded not to implement in production.

At the moment only two types of errors have formalised: 400 and 401

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

### Step Two: Call next with REST_ERROR_HANDLER object

```javascript
// login.js
import {
    BAD_REQUEST,
    UNAUTHORIZED,
} from 'rest-error-handler';

export default function(req, res, next) {
    const {
        username,
    } = req.query;
    
    if (username === void 0) {
        return next({
            REST_ERROR_HANDLER: {
                type: BAD_REQUEST, // HTTP status 400
                payload: {
                    field: 'username', // Declare which field is required
                },
            },
        });
    }
    
    if (username !== 'correct name') {
        return next({
            REST_ERROR_HANDLER: {
                type: UNAUTHORIZED, // HTTP status 401
            },
        });
    }
    
    res.send('you are logged in');
}
```