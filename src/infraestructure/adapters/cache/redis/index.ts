import { RedisClientType, createClient } from "@node-redis/client";

class RedisWrapper {
  private _client?: RedisClientType;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access Redis client before connecting");
    }

    return this._client;
  }

  async connect(host: string, port: number, password: string) {
    this._client = createClient({
      url: `redis://${host}:${port}`,
      password,
    });

    this._client.on("error", (err: any) =>
      console.log("Redis Client Error", err)
    );

    await this._client.connect();
  }
}

export const redisWrapper = new RedisWrapper();
