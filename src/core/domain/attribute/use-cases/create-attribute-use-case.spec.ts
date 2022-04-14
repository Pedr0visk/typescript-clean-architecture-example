import { InMemoryAttributesRepository } from "@tests/repositories/in-memory-attributes-repository";
import { Attribute } from "../entities/Attribute";
import { CreateAttributeUseCase } from "./create-attribute-use-case";

describe("Create a new attribute", () => {
  it("Should create successfully a new attribute", async () => {
    const attributesRepository = new InMemoryAttributesRepository();
    const sut = new CreateAttributeUseCase(attributesRepository);

    const res = await sut.execute({
      account_id: 1,
      name: "email",
      value: "pedro@email.com",
    });

    expect(res).toBeTruthy();
    expect(res).toBeInstanceOf(Attribute);
    expect((await attributesRepository.getAllByAccountId(1)).length).toEqual(1);
  });

  it("Should validate name and value", async () => {
    const attributesRepository = new InMemoryAttributesRepository();
    const sut = new CreateAttributeUseCase(attributesRepository);

    try {
      await sut.execute({
        account_id: 1,
        name: "",
        value: "",
      });
    } catch (error) {}

    expect((await attributesRepository.getAllByAccountId(1)).length).toEqual(0);
  });
});
