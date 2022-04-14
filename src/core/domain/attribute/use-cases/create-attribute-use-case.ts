import { Attribute } from "../entities/Attribute";
import { IAttributesRepository } from "../entities/contracts/attributes-repository";

import { ICreateAttributeDTO } from "./create-attribute-dto";

export class CreateAttributeUseCase {
  constructor(private attributesRepository: IAttributesRepository) {}

  async execute(data: ICreateAttributeDTO): Promise<Attribute> {
    // check if object already exists
    const found = await this.attributesRepository.getByAccountIdAndValue(
      data.account_id,
      data.value
    );

    if (found) {
      throw new Error("Attribute already exists");
    }

    const attribute = new Attribute(data);
    await this.attributesRepository.create(attribute);
    return attribute;
  }
}
