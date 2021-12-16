export interface Logger {
  info(message: string): void;
  debug(message: string): void;
  trace(message: string, data: object): void;
  error(data: object): void;
  getMiddleware(): any[];
}
