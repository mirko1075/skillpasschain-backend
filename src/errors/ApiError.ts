export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
