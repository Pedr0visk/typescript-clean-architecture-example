import express from "express";
import { getAudienceFilterOptionsController } from "../controllers";

const router = express.Router();

router.post("/api/config/audience-filter-options", (req, res) => {
  return getAudienceFilterOptionsController.handle(req, res);
});

export { router as audienceFilterOptionsRouter };
