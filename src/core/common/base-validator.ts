import { validate as _validate, ValidationError } from "class-validator";

export interface IError {
  messages: string[];
  field: string;
}

export abstract class BaseValidator {
  async validate(): Promise<ValidationError[]> {
    const errors = await _validate(this);

    if (errors.length > 0) {
      return errors;
    }

    return [];
  }
}
