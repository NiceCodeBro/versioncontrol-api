export class InputValidationError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, InputValidationError.prototype);
  }
}