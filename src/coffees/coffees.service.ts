import { HttpException, Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  constructor(
      @InjectRepository(Coffee)
      private readonly coffeeRepository: Repository<Coffee>
  ) {}

  public findAll(): Promise<Coffee[]> {
    return this.coffeeRepository.find();
  }

  public async findOne(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne(id);
    if (!coffee) {
      throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  public create(coffeeDTO: CreateCoffeeDto): Promise<Coffee> {
    const coffee = this.coffeeRepository.create(coffeeDTO);
    return this.coffeeRepository.save(coffee);
  }

  public async update(id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
    const existingCoffee = await this.coffeeRepository.preload({
        id: id,
        ...updateCoffeeDto
    });
    if (!existingCoffee) {
      throw new NotFoundException(`Coffee ${id} Not Found`);
    }
    return this.coffeeRepository.save(existingCoffee);
  }

  public async remove(id: number): Promise<Coffee> {
    const coffeeIndex = await this.findOne(id);
    return this.coffeeRepository.remove(coffeeIndex);
  }
}
