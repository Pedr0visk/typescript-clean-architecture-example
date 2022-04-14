import { ISegmentsRepository } from "../entities/contracts/segments-repository";

interface GetSegmentsDTO {
  by: {
    lang?: string;
  };
}
export class GetSegmentsUseCase {
  constructor(private segmentsRepository: ISegmentsRepository) {}
  async execute(data: GetSegmentsDTO) {
    const segments = await this.segmentsRepository.findSegments({
      lang: data.by.lang,
    });
    return segments;
  }
}
