import { ValidationError } from "class-validator";
import { DTOError } from "./dto-error";

export class DTOValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super("DTO Validation Error");
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors(): DTOError[] {
    return this.errors.map((err) => ({
      messages: Object.values(err.constraints || {}),
      field: err.property,
    }));
  }
}
