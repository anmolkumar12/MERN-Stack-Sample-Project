const path = require('path');
 
module.exports = {
    ROUTE_PREFIX: "",
    STATUS_CODE: {
        ERROR: 0,
        SUCCESS: 1,
        INVALID_TOKEN: 1000
    },
    RESPONSE_STATUS: {
        SUCCESS: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_ERROR: 500
    },
    SSO_RESPONSE_CODE: {
        SUCCESS: 0,
        BAD_REQUEST: 1,
        UNAUTHORIZED: 2,
        FORBIDDEN: 3,
        NOT_FOUND: 4,
        INTERNAL_ERROR: 5
    },
    ERROR_TYPE: {
        BAD_TOKEN: 'BadTokenError',
        TOKEN_EXPIRED: 'TokenExpiredError',
        ACCESS_TOKEN: 'AccessTokenError',
        NOT_FOUND: 'NotFoundError',
        NO_ENTRY: 'NoEntryError',
        NO_DATA: 'NoDataError',
        UNAUTHORIZED: 'AuthFailureError',
        INTERNAL: 'InternalError',
        BAD_REQUEST: 'BadRequestError',
        FORBIDDEN: 'ForbiddenError'
    },
    STATUS: {
        DELETED: 0,
        ACTIVE: 1,
        INACTIVE: 2
    },

}
