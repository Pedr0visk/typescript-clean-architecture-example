import { IEventsRepository } from "@core/domain/event/entities/contracts/events-repository";
import { Event } from "@core/domain/event/entities/Event";
import { Event as TypeOrmEvent } from "@infraestructure/adapters/orm/postgres/entities/Event";

import { getRepository, SelectQueryBuilder } from "typeorm";
import { TypeOrmEventMapper } from "../mappers/type-orm-events-mapper";

export class EventsRepository implements IEventsRepository {
  async create(data: Event): Promise<void> {
    const repo = getRepository(TypeOrmEvent);
    const event = repo.create({
      id: data.id,
      account_id: data.account_id,
      code: data.code,
      name: data.name,
    });

    await repo.save(event);
  }

  async findEvent(by: {
    account_id?: number;
    code?: string;
  }): Promise<Event | null> {
    const query: SelectQueryBuilder<TypeOrmEvent> =
      this.buildEventQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    const found = await query.getOne();
    if (found) {
      return TypeOrmEventMapper.toDomainEntity(found);
    }
    return null;
  }

  async findEvents(by: {
    account_id?: number | undefined;
    code?: string | undefined;
  }): Promise<Event[]> {
    const query: SelectQueryBuilder<TypeOrmEvent> =
      this.buildEventQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    const ormEvents: TypeOrmEvent[] = await query.getMany();

    const domainEvents: Event[] =
      TypeOrmEventMapper.toDomainEntities(ormEvents);
    return domainEvents;
  }

  private buildEventQueryBuilder(): SelectQueryBuilder<TypeOrmEvent> {
    const repo = getRepository(TypeOrmEvent);
    return repo.createQueryBuilder("events").select();
  }

  private extendQueryWithByProperties(
    by: { code?: string; account_id?: number },
    query: SelectQueryBuilder<TypeOrmEvent>
  ) {
    if (by.code) {
      query.andWhere("events.code = :code", { code: by.code });
    }

    if (by.account_id) {
      query.andWhere("events.account_id = :account_id", {
        account_id: by.account_id,
      });
    }
  }
}
