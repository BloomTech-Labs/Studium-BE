module.exports = ( err, functionName, userMessage ) => {
  err.functionName = functionName;
  err.userMessage = userMessage;
  return err;
};