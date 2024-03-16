function localVariables(req, res, next) {
    req.app.locals = {
      OTP: null,
    };
    next();
}

module.exports = localVariables;
