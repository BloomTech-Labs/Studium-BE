module.exports = ( status, functionName = undefined, userMessage = undefined,
  thrownErr = undefined ) => {
  let error = new Error( userMessage );
  if( thrownErr ){
    error = thrownErr;
  }
  error.status = status;
  if( functionName ){
    error.functionName = functionName;
  }
  if( userMessage ){
    error.userMessage = userMessage;
  }
  return error;
};