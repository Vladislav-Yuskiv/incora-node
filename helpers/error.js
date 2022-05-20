class myCustomError extends Error {
    constructor(message) {
      super(message);
      this.status = 400;
    }
  }
  
  class ValidationError extends myCustomError {
    constructor(message) {
      super(message);
      this.status = 400;
    }
  }
  
  class NotFoundError extends myCustomError {
    constructor(message) {
      super(message);
      this.status = 404;
    }
  }
  
  class WrongParametersError extends myCustomError {
    constructor(message) {
      super(message);
      this.status = 400;
    }
  }
  
  class NotAuthorizedError extends myCustomError {
    constructor(message) {
      super(message);
      this.status = 401;
    }
  }
  class UserAlreadyExistsError extends myCustomError {
    constructor(message) {
      super(message);
      this.status = 400;
    }
  }
  
  
  
  module.exports = {
      myCustomError,
      ValidationError,
      NotFoundError,
      WrongParametersError,
      NotAuthorizedError,
      UserAlreadyExistsError
  }
  