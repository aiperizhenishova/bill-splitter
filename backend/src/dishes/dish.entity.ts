import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dishes')
export class Dish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;
}