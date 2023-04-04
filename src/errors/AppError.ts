class AppError extends Error {
  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }

  statusCode: number;
}

export { AppError };
