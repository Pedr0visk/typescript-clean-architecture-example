import { IEventsRepository } from "../entities/contracts/events-repository";
import { Event } from "../entities/Event";

interface ICreateEventDTO {
  account_id: number;
  code: string;
  name: string;
}

export class CreateEventUseCase {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(data: ICreateEventDTO): Promise<Event> {
    const found = await this.eventsRepository.findEvent({
      account_id: data.account_id,
      code: data.code,
    });

    if (found) {
      throw new Error("Event already exists");
    }

    const event = new Event(data);
    console.log("new event", event);
    await this.eventsRepository.create(event);
    return event;
  }
}
