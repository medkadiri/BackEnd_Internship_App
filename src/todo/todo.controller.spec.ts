import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoDTO } from './todo.dto';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;

  const mockTodoService = {
    add: jest.fn(dto => {
      return dto;
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    })
      .overrideProvider(TodoService)
      .useValue(mockTodoService)
      .compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add todo', async () => {
    const dto = { id: 1, description: 'Testing' };
    const returned = {
      statusCode: HttpStatus.OK,
      message: 'Todo created successfully',
      todo: dto
    };
    expect(await controller.createTodo(dto)).toEqual(returned);
  });

});
