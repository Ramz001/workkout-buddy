function localVariables (req, res, next){
 req.app.locals = {
  OTP: null,
  resetSession: false,
  user: null
 }   
 next()
}

module.exports = localVariables