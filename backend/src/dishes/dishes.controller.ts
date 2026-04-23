import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import{DishesService} from "./dishes.service";
import {Dish} from "./dish.entity";

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
    create(@Body() newDish: any){
        return this.dishesService.create(newDish);
    }
}
