/**
* tenant
*
* @module      :: Policy
* @description ::
* @docs        :: http://sailsjs.org/#!documentation/policies
*
*/
module.exports = function(req, res, next) {
    var tenantId = req.headers.host;
    // Important: `req.session.tenant` is where you attach the tenant identifer
    req.session.tenant = tenantId;
    // Policy complete, continue...
    next();
};
