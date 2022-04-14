import { InMemoryAttributesRepository } from "@tests/repositories/in-memory-attributes-repository";
import { Attribute } from "../entities/Attribute";
import { GetAttributesByAccountIdUseCase } from "./get-attributes-by-account-id-use-case";

describe("Get Attributes by Account ID", () => {
  it("Should return all attributes that belongs to an especified account", async () => {
    const attributesRepository = new InMemoryAttributesRepository();

    // Add some attributes to memory database
    await attributesRepository.create(
      new Attribute({
        account_id: 1,
        name: "email",
        value: "pedro@email.com",
      })
    );

    await attributesRepository.create(
      new Attribute({
        account_id: 2,
        name: "email",
        value: "pedro@email.com",
      })
    );

    await attributesRepository.create(
      new Attribute({
        account_id: 1,
        name: "job",
        value: "full stack developer",
      })
    );

    const sut = new GetAttributesByAccountIdUseCase(attributesRepository);

    const res = await sut.execute({ account_id: 1 });

    expect(res).toBeTruthy();
    expect(res).toHaveLength(2);
  });
});
