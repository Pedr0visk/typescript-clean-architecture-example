import translations from "./json/enUs.json";
import segments from "./json/segments.json";

import { getRepository } from "typeorm";
import { SegmentTranslation } from "../entities/SegmentTranslation";
import { v4 } from "uuid";

interface translationsJSON {
  [index: string]: any;
}

const trans: translationsJSON = translations;

function buildSegmentName(segment: {
  category: string;
  parentId?: number | null;
  id: string;
}): string {
  const current = trans[segment.category][segment.id];

  if (!current) {
    return "--";
  }

  if (!current.pid) {
    return current.name;
  }

  const parentName = buildSegmentName({
    category: segment.category,
    id: current.pid,
    parentId: trans[segment.category][current.pid]?.pid || null,
  });

  return `${parentName} > ${current.name}`;
}

async function run(): Promise<void> {
  const translationRepo = getRepository(SegmentTranslation);

  let index = 0;
  while (index < segments.length) {
    const segment = {
      pid: segments[index]?.pid || null,
      cid: segments[index].cid,
      category: segments[index].category,
    };

    const item = {
      id: v4(),
      lang: "en-us",
      segment: { id: +segment.cid },
      category: segment.category,
      text: buildSegmentName({
        category: segment.category,
        id: segment.cid,
        parentId: segment.pid ? +segment.pid : null,
      }),
    };

    console.log(item);

    const newTranslation = translationRepo.create(item);
    await translationRepo.save(newTranslation);

    index++;
  }
}

export default {
  run,
};
