"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware = (request, response, next) => {
    console.log(request.url + '   This path visited before');
    next();
};
exports.default = middleware;
