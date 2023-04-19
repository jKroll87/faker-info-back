import { Controller, Get } from '@nestjs/common';
import { SummonerData } from './summoner.interface';
import { SummonerService } from './summoner.service';

@Controller('api/summoner')
export class SummonerController {
  constructor(private readonly summonerService: SummonerService) {}

  @Get()
  getSummoner(): Promise<SummonerData> {
    return this.summonerService.findSummoner();
  }
}
