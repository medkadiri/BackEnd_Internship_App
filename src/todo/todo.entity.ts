import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('todo')
export class TodoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
}