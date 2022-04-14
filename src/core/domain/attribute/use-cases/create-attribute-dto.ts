import { BaseValidator } from "@core/common/base-validator";
import { IsNotEmpty, Length } from "class-validator";

export interface ICreateAttributeDTO {
  account_id: number;
  name: string;
  value: string;
}

export class ValidateRequest
  extends BaseValidator
  implements ICreateAttributeDTO
{
  @IsNotEmpty()
  public account_id: number;

  @Length(2, 255)
  public name: string;

  @Length(1, 255)
  public value: string;

  constructor(props: ICreateAttributeDTO) {
    super();
    Object.assign(this, props);
  }
}
