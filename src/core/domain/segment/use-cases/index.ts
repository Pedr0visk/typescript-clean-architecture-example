import { SegmentsRepository } from "@infraestructure/adapters/orm/postgres/repositories/segments-repository";
import { GetSegmentsUseCase } from "./get-segments-use-case";

const segmentsRepository = new SegmentsRepository();
const getSegmentsUseCase = new GetSegmentsUseCase(segmentsRepository);

export { getSegmentsUseCase };
