import { HttpStatus } from '../libs';

export class ApiError extends Error {
  private status: HttpStatus;

  constructor(status: HttpStatus, message: string) {
    super(message);
    this.status = status;
  }

  getStatus() {
    return {
      name: HttpStatus[this.status],
      status: this.status,
    };
  }

  static from(error: Error) {
    return new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
}
