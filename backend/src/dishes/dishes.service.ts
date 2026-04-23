
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Dish} from "./dish.entity";

@Injectable()
export class DishesService {
    constructor(
        @InjectRepository(Dish)
        private dishRepository: Repository<Dish>,
    ) {}

    findAll(): Promise<Dish[]>{
        return this.dishRepository.find();
    }

    findOne(id:number): Promise<Dish | null>{
        return this.dishRepository.findOneBy({id});
    }


    create(dish: Partial<Dish>): Promise<Dish> {
        return this.dishRepository.save(dish);
    }
}