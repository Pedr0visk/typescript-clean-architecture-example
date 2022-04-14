import { IEventsRepository } from "../entities/contracts/events-repository";
import { Event } from "../entities/Event";

interface GetEventsDTO {
  account_id: number;
}

export class GetEventsUseCase {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(data: GetEventsDTO): Promise<Event[]> {
    const events = await this.eventsRepository.findEvents(data);
    return events;
  }
}
