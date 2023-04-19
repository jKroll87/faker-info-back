import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SummonerData } from './summoner.interface';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class SummonerService {
  private readonly API_BASE_URL = 'https://kr.api.riotgames.com/lol/league/v4';
  private readonly id: string;
  private readonly API_KEY: string;
  private readonly logger = new Logger(SummonerService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.id = this.configService.get<string>('id');
    this.API_KEY = this.configService.get<string>('API_KEY');
  }

  async findSummoner(): Promise<SummonerData> {
    const url = `${this.API_BASE_URL}/entries/by-summoner/${this.id}`;
    const headers = { 'X-Riot-Token': this.API_KEY };

    const { data } = await firstValueFrom(
      this.httpService.get<SummonerData>(url, { headers }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    const { summonerName, tier, rank, leaguePoints, wins, losses } = data[0];
    const winRate = ((wins / (wins + losses)) * 100).toFixed(2) + '%';

    const summoner: SummonerData = {
      summonerName,
      ranking: 1, /* temporary value */
      tier: `${tier} ${rank}`,
      leaguePoints,
      matches: wins + losses,
      wins,
      losses,
      winRate
    };

    return summoner;
  }
}