import { Event } from "@core/domain/event/entities/Event";
import { Event as TypeOrmEvent } from "../entities/Event";

export class TypeOrmEventMapper {
  public static toDomainEntity(ormEvent: TypeOrmEvent): Event {
    const domainEvent: Event = new Event(
      {
        account_id: ormEvent.account_id,
        code: ormEvent.code,
        name: ormEvent.name,
      },
      ormEvent.id
    );

    return domainEvent;
  }

  public static toDomainEntities(ormEvents: TypeOrmEvent[]): Event[] {
    return ormEvents.map((ormEvent) => this.toDomainEntity(ormEvent));
  }
}
