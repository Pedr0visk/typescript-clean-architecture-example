import { Message } from "kafkajs";
import { Consumer, EventRecipientCreatedEvent, Topics } from "@navegg/common";
import { queueGroupName } from "../kafka-group-name";
import { createEventUseCase } from "@core/domain/event/use-cases";

export class EventRecipientCreatedConsumer extends Consumer<EventRecipientCreatedEvent> {
  topic: Topics.EventRecipientCreated = Topics.EventRecipientCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: EventRecipientCreatedEvent["data"], msg: Message) {
    console.log(` [x] message received on topic: ${this.topic} -> `, data);

    try {
      await createEventUseCase.execute({
        account_id: data.owner.accountId,
        code: data.event.code,
        name: data.event.name,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
