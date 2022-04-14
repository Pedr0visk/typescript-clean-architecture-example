import { Attribute } from "@core/domain/attribute/entities/Attribute";
import { IAttributesRepository } from "@core/domain/attribute/entities/contracts/attributes-repository";

export class InMemoryAttributesRepository implements IAttributesRepository {
  attributes: Attribute[] = [];

  async create(attribute: Attribute): Promise<void> {
    this.attributes.push(attribute);
  }

  async getAllByAccountId(accountId: number): Promise<Attribute[]> {
    const results = this.attributes.filter((attr) => {
      return attr.account_id === accountId;
    });
    return results;
  }

  async getByAccountIdAndValue(
    accountId: number,
    value: string
  ): Promise<Attribute | null> {
    const result = this.attributes.find((attr) => {
      return attr.account_id === accountId;
    });
    return result || null;
  }
}
