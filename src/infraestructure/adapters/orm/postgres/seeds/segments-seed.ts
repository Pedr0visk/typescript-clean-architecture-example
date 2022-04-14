import segments from "./json/segments.json";

import { getRepository } from "typeorm";
import { Segment } from "../entities/Segment";

async function run(): Promise<void> {
  const repo = getRepository(Segment);

  let index = 0;
  while (index < segments.length) {
    const segment: any = segments[index];

    const obj = repo.create({
      id: +segment.cid,
      parent_id: segment.pid ? +segment.pid : undefined,
      category: segment.category,
    });

    await repo.save(obj);

    index++;
  }
}

export default {
  run,
};
