import { Attribute } from "../Attribute";

export interface IAttributesRepository {
  create(attribute: Attribute): Promise<void>;
  getAllByAccountId(accountId: number): Promise<Attribute[]>;
  getByAccountIdAndValue(
    accountId: number,
    value: string
  ): Promise<Attribute | null>;
}
