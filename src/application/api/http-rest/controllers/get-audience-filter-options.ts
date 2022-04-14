import { GetAttributesByAccountIdUseCase } from "@core/domain/attribute/use-cases/get-attributes-by-account-id-use-case";
import { GetEventsUseCase } from "@core/domain/event/use-cases/get-events-use-case";
import { getSegmentsUseCase } from "@core/domain/segment/use-cases";
import { redisWrapper } from "@infraestructure/adapters/cache/redis";
import { Request, Response } from "express";

export class GetAudienceFilterOptions {
  constructor(
    private getAttributesByAccountIdUseCase: GetAttributesByAccountIdUseCase,
    private getEventsUseCase: GetEventsUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id, lang = "pt-br" } = request.body;

    const redisClient = redisWrapper.client;

    const getResponseDataCached = (): Promise<string> => {
      return new Promise((resolve, reject) => {
        redisClient
          .get(`response:${account_id}:${lang}`)
          .then((res: any) => {
            resolve(res);
          })
          .catch((err: any) => {
            resolve(err);
          });

        setTimeout(() => {
          reject("Get response data to cache take too long.");
        }, 500);
      });
    };

    try {
      const dataCached = await getResponseDataCached();
      if (dataCached) {
        console.log(" [x] returned from cache");
        return response.status(200).send(JSON.parse(dataCached));
      }
    } catch (error) {
      console.log(error);
    }

    // validate request

    if (!account_id || account_id === "" || account_id === undefined) {
      return response.status(400).send({ message: "Bad Request" });
    }

    // mount response
    const responseData: any = {
      attributes: { selects: {} },
      segments: { selects: {} },
      events: { name: "event", search_key: "event.code", options: [] },
    };

    //  -

    const attributes = await this.getAttributesByAccountIdUseCase.execute({
      account_id,
    });
    let count = 0;
    while (count < attributes.length) {
      const { id, name, value } = attributes[count];
      if (responseData.attributes.selects[name] == undefined) {
        responseData.attributes.selects[name] = {};
        responseData.attributes.selects[name].name = name;
        responseData.attributes.selects[name].options = [];
      }

      responseData.attributes.selects[name].options.push({
        text: value,
        value,
        id,
      });
      count++;
    }

    // -

    const events = await this.getEventsUseCase.execute({
      account_id,
    });
    count = 0;
    while (count < events.length) {
      const { code, name, id } = events[count];
      responseData.events.options.push({ id, text: name, value: code });
      count++;
    }

    // -

    let segments = await getSegmentsUseCase.execute({
      by: { lang: lang },
    });

    count = 0;
    while (count < segments.length) {
      const { id, category, translations = [] } = segments[count];
      if (responseData.segments.selects[category] == undefined) {
        responseData.segments.selects[category] = {};
        responseData.segments.selects[
          category
        ].search_key = `segments.${category}`;
        responseData.segments.selects[category].options = [];
      }

      if (translations?.length > 0) {
        responseData.segments.selects[category].options.push({
          text: translations[0].text,
          value: id,
        });
      }

      count++;
    }

    // -

    const cacheResponseData = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        redisClient
          .set(`response:${account_id}:${lang}`, JSON.stringify(responseData), {
            EX: 60, // seconds
          })
          .then(() => {
            resolve();
          });

        setTimeout(() => {
          reject("Operation timed out");
        }, 1000);
      });
    };

    try {
      await cacheResponseData();
    } catch (error) {
      console.log(error);
    }

    console.log(" [x] returned normal");
    return response.status(200).send(responseData);
  }
}
