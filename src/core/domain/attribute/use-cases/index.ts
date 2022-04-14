import { AttributesRepository } from "@infraestructure/adapters/orm/postgres/repositories/attributes-repository";
import { CreateAttributeUseCase } from "./create-attribute-use-case";
import { GetAttributesByAccountIdUseCase } from "./get-attributes-by-account-id-use-case";

const attributesRepository = new AttributesRepository();

const getAttributesByAccountIdUseCase = new GetAttributesByAccountIdUseCase(
  attributesRepository
);

const createAttributeUseCase = new CreateAttributeUseCase(attributesRepository);

export { getAttributesByAccountIdUseCase, createAttributeUseCase };
