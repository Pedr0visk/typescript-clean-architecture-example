import { EventsRepository } from "@infraestructure/adapters/orm/postgres/repositories/events-repository";
import { CreateEventUseCase } from "./create-event-use-case";
import { GetEventsUseCase } from "./get-events-use-case";

const eventsRepository = new EventsRepository();

const createEventUseCase = new CreateEventUseCase(eventsRepository);
const getEventsUseCase = new GetEventsUseCase(eventsRepository);

export { createEventUseCase, getEventsUseCase };
