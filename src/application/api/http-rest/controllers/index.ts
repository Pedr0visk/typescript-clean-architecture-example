import { getAttributesByAccountIdUseCase } from "@core/domain/attribute/use-cases";
import { getEventsUseCase } from "@core/domain/event/use-cases";
import { GetAudienceFilterOptions } from "./get-audience-filter-options";

// create new instance of controllers passing use cases
const getAudienceFilterOptionsController = new GetAudienceFilterOptions(
  getAttributesByAccountIdUseCase,
  getEventsUseCase
);

export { getAudienceFilterOptionsController };
