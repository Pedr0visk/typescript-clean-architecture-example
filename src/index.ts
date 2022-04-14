import "reflect-metadata";
import "module-alias/register";

import { app } from "@application/app";
import { redisWrapper } from "@infraestructure/adapters/cache/redis";
import { connect } from "@infraestructure/adapters/orm/postgres";
import { kafkaWrapper } from "@infraestructure/adapters/streaming/kafka";
import { CustomerSavedConsumer } from "@infraestructure/adapters/streaming/kafka/consumers/customer-saved-consumer";
import { EventRecipientCreatedConsumer } from "@infraestructure/adapters/streaming/kafka/consumers/event-recipient-created-consumer";

const start = async () => {
  if (!process.env.REDIS_HOST) {
    throw new Error("REDIS_HOST must be defined");
  }
  if (!process.env.REDIS_PORT) {
    throw new Error("REDIS_PORT must be defined");
  }
  if (!process.env.REDIS_PASSWORD) {
    throw new Error("REDIS_PASSWORD must be defined");
  }

  if (!process.env.APP_NAME) {
    throw new Error("APP_NAME must be defined");
  }
  if (!process.env.KAFKA_BROKERS) {
    throw new Error("KAFKA_BROKERS must be defined");
  }

  try {
    // connect database
    await connect();

    // connect redis cache
    await redisWrapper.connect(
      process.env.REDIS_HOST,
      +process.env.REDIS_PORT,
      process.env.REDIS_PASSWORD
    );

    // connect kafka streaming
    await kafkaWrapper.connect(
      process.env.APP_NAME,
      process.env.KAFKA_BROKERS.split(",")
    );
    new CustomerSavedConsumer(kafkaWrapper.client).listen();
    new EventRecipientCreatedConsumer(kafkaWrapper.client).listen();
  } catch (error) {
    console.log("Starting app failed.", error);
  }

  const port = process.env.NODE_ENV == "production" ? 8000 : 3030;
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
};

start();
