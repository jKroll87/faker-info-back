import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SummonerModule } from './modules/summoner/summoner.module';

@Module({
  imports: [SummonerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
