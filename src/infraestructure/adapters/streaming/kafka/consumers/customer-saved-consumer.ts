import { Message } from "kafkajs";
import { Consumer, CustomerSavedEvent, IEvent, Topics } from "@navegg/common";
import { queueGroupName } from "../kafka-group-name";
import { createAttributeUseCase } from "@core/domain/attribute/use-cases";
import { redisWrapper } from "@infraestructure/adapters/cache/redis";
import { createEventUseCase } from "@core/domain/event/use-cases";

export class CustomerSavedConsumer extends Consumer<CustomerSavedEvent> {
  topic: Topics.CustomerSaved = Topics.CustomerSaved;
  queueGroupName = queueGroupName;

  async onMessage(data: CustomerSavedEvent["data"], msg: Message) {
    console.log(` [x] message received on topic: ${this.topic} -> `, data);

    // saving attributes
    for (let attribute in data.attributes) {
      try {
        await createAttributeUseCase.execute({
          account_id: data.accountId,
          name: attribute,
          value: data.attributes[attribute],
        });
      } catch (error) {
        console.log(error);
      }
    }

    // saving events
    for (let event in data.events) {
      try {
        await createEventUseCase.execute({
          account_id: data.accountId,
          code: data.events[event].eventId,
          name: data.events[event].name,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
