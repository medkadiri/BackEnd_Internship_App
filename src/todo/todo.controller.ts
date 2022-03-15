import { 
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpStatus,
} from '@nestjs/common';

import { TodoService } from './todo.service';
import { TodoDTO } from './todo.dto';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Get()
    async listAll() {
        const todo = await this.todoService.listAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Todo list fetched successfully',
            todo
        };
    }

    @Post()
    async createTodo(@Body() data: TodoDTO) {
        const todo = await this.todoService.add(data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Todo created successfully',
            todo
        };
    }

    @Patch(':id')
    async modifyTodo(@Param('id') id: number, @Body() data: Partial<TodoDTO>) {
        await this.todoService.modify(id, data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Todo modified successfully'
        };
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id: number) {
        await this.todoService.delete(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Todo deleted successfully'
        };
    }
}
