import { getRepository } from "typeorm";
import { Segment } from "../entities/Segment";
import { SegmentTranslation } from "../entities/SegmentTranslation";
import SegmentsTranslationsUs from "./segments-en-us-seed";
import SegmentsTranslationsBr from "./segments-pt-br-seed";
import SegmentsTranslationsEs from "./segments-es-mx-seed";
import SegmentsSeed from "./segments-seed";
import { connect } from "..";

(async function () {
  await connect();

  await SegmentsTranslationsEs.run();
})();
