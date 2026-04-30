import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { Dish } from './dish.entity';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  getAll() {
    return this.dishesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.dishesService.findOne(+id);
  }

  @Post()
  create(@Body() newDish: Partial<Dish>) {
    return this.dishesService.create(newDish);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dishesService.delete(+id);
  }
}
