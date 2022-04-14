import { Attribute } from "@core/domain/attribute/entities/Attribute";
import { IAttributesRepository } from "@core/domain/attribute/entities/contracts/attributes-repository";
import { getRepository, Repository } from "typeorm";
import { Attribute as AttributeEntity } from "../entities/Attribute";

export class AttributesRepository implements IAttributesRepository {
  async create(data: Attribute): Promise<void> {
    const repo = getRepository(AttributeEntity);
    const attribute = repo.create(data);
    await repo.save(attribute);
  }

  async getAllByAccountId(accountId: number): Promise<Attribute[]> {
    const repo = getRepository(AttributeEntity);
    const attributes = await repo.find({
      where: { account_id: accountId },
    });
    return attributes;
  }

  async getByAccountIdAndValue(
    accountId: number,
    value: string
  ): Promise<Attribute | null> {
    const repo = getRepository(AttributeEntity);
    const found = await repo.findOne({
      where: { account_id: accountId, value: value },
    });

    if (found) {
      return new Attribute({
        account_id: found.account_id,
        name: found.name,
        value: found.value,
      });
    }
    return null;
  }
}
