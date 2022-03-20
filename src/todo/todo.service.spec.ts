import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  const mockTodoRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(todoEntity => Promise.resolve({ id: 1, ...todoEntity }))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService, {
        provide: getRepositoryToken(TodoEntity),
        useValue: mockTodoRepository,
      }],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new todo and return it', async () => {
    const dto = { id: 1, description: 'Testing' };
    expect(await service.add(dto)).toEqual({
      id: expect.any(Number),
      description: 'Testing',
    })
  })
});
