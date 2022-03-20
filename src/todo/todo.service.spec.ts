import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  const mockTodoRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([TodoEntity])],
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
});
