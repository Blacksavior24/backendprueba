import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/tasks/entities/category.entity';


@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ){}

  async create(createTaskDto: CreateTaskDto) {
    
    const { title, description, active, categories} = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.active = active;

    if (categories && categories.length > 0) {
      const taskCategories = await Promise.all(
        categories.map(async categoryId => {
          const category = await this.categoryRepository.findOne({where: {id: categoryId}});
          return category;
        }),
      );

      task.categories = taskCategories;
    }
    
    return await this.taskRepository.save(task);
  }

  async findAll() {
    return await this.taskRepository.find({relations: ['categories']});
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({
      where: {id},
      relations: ['categories']
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOneBy({id});

    if (!task) {
        return null;
    }

    const { title, description, active, categories } = updateTaskDto;

    task.title = title;
    task.description = description;
    task.active = active;

    if (categories && categories.length>0) {
          
      task.categories = await Promise.all(categories.map(async categoryId => {
        const category = await this.categoryRepository.findOne({where:{id: categoryId}});
        return category;
      })); 
    }

    return await this.taskRepository.save(task)
  }

  async remove(id: number) {
    return await this.taskRepository.delete({id});
  }
}
