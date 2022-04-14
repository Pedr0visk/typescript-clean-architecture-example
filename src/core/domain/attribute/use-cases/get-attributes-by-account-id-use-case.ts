import { Attribute } from "../entities/Attribute";
import { IAttributesRepository } from "../entities/contracts/attributes-repository";

interface IGetAttributesByAccountIdUseCaseDTO {
  account_id: number;
}

export class GetAttributesByAccountIdUseCase {
  constructor(private attributesRepository: IAttributesRepository) {}

  async execute(
    data: IGetAttributesByAccountIdUseCaseDTO
  ): Promise<Attribute[]> {
    const attributes = await this.attributesRepository.getAllByAccountId(
      data.account_id
    );

    return attributes;
  }
}
