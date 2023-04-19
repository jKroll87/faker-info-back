import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SummonerController } from './summoner.controller';
import { SummonerService } from './summoner.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [SummonerController],
  providers: [SummonerService],
})
export class SummonerModule {}