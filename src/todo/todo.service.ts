import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TodoEntity } from './todo.entity';
import { TodoDTO } from './todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private todoRepository: Repository<TodoEntity>,
    ){}

    async listAll() {
        return await this.todoRepository.find();
    }

    async add(data: TodoDTO) {
        const todo = this.todoRepository.create(data);
        await this.todoRepository.save(data);
        return todo;
    }

    async modify(id: number, data: Partial<TodoDTO>) {
        await this.todoRepository.update({ id }, data);
        return await this.todoRepository.findOne({ id });
    }

    async delete(id: number) {
        await this.todoRepository.delete({ id });
        return { deleted: true };
    }
}
