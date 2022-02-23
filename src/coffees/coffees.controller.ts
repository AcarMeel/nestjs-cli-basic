import { PaginationQueryDto } from './../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res, SetMetadata } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('coffees')
export class CoffeesController {
    constructor(
        private readonly coffeeService: CoffeesService,
    ) {}
    
    @Public()
    @Get()
    public async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Array<Coffee>> {
        await new Promise(resolve => setTimeout(resolve, 5000));
        return this.coffeeService.findAll(paginationQuery);
    }

    // @Get('rest')
    // public findAllRes(@Res() response): any {
    //     response.status(200).send(this.coffeeService.findAll());
    // }

    @Get('params')
    public findAllQuery(@Query() pagination): string {
        const {limit, offset } = pagination;
        return `Hello Coffee Qry Params ${limit}, ${offset}`;
    }

    // Nested routes
    @Get('flavors')
    public findAllFlavors(): Array<string> {
        return ['Latte', 'Mocha', 'Expresso', 'Capuccino'];
    }

    @Get('obsolete/:id')
    public findOneObsolete(@Param() params): string {
        return `Capuccino Obsolete with id ${params.id}`;
    }

    @Get(':id')
    public findOne(@Param('id') id: number): Promise<Coffee> {
        try {
            return this.coffeeService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @Post()
    public create(@Body() body: CreateCoffeeDto): any {
        return this.coffeeService.create(body);
    }

    @Post('v2')
    @HttpCode(HttpStatus.GONE)
    public createV2(@Body('name') name: string): string {
        return name;
    }

    @Patch(':id')
    public patchCoffee(@Param('id') id: number, @Body() body: UpdateCoffeeDto): any {
        return this.coffeeService.update(id, body);
    }

    @Delete(':id')
    public deleteCoffee(@Param('id') id: number): any {
        return this.coffeeService.remove(id);
    }
}
