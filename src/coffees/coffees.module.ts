import { ConfigModule } from '@nestjs/config';
import { Flavor } from './entities/flavor.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

@Module({
  imports: [TypeOrmModule.forFeature([
    Coffee,
    Flavor,
    Event
  ]), ConfigModule],
  controllers: [CoffeesController],
  providers: [CoffeesService, {provide: COFFEE_BRANDS, useValue: ['Britt', 'CR Verde']}],
  exports: [CoffeesService]
})
export class CoffeesModule {}
