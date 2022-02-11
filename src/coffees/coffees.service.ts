import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Array<Coffee> = [
    {
      id: 1,
      name: 'Capuccino',
      brand: 'Costa Rica Verde',
      flavors: ['Vanilla, Chocolate'],
    },
    {
      id: 2,
      name: 'Expresso',
      brand: 'Costa Rica Verde',
      flavors: ['Vanilla, Chocolate'],
    },
    {
      id: 3,
      name: 'Mocha',
      brand: 'Costa Rica Verde',
      flavors: ['Vanilla, Chocolate'],
    },
  ];

  public findAll(): Array<Coffee> {
    return this.coffees;
  }

  public findOne(id: number): Coffee {
    const coffee = this.coffees.find((coffee) => coffee.id === id);
    if (!coffee) {
        throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  public create(coffeeDTO: CreateCoffeeDto): CreateCoffeeDto {
    const maxVal = this.coffees.reduce((prev, current) => (prev.id > current.id) ? prev : current);
    this.coffees.push({
      id: maxVal ? maxVal.id + 1 : 1,
      ...coffeeDTO
    });
    return coffeeDTO;
  }

  public update(id: number, updateCoffeeDto: UpdateCoffeeDto): void {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  public remove(id: number): void {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
