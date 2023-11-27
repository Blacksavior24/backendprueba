import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ){}

  async create(createCategoryDto: CreateCategoryDto) {

    const { name, tasks } = createCategoryDto;
    const category = new Category();
    category.name = name;
    if (tasks && tasks.length > 0) {
      const taskCategories = await Promise.all(
        tasks.map(async taskId => {
          const category = await this.taskRepository.findOne({where:{id: taskId}});
          return category;
        }),
      );

      category.tasks = taskCategories;
    }
    
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository.find({relations: ['tasks']});
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({id});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({id});

    if (!category){
      return null;
    }

    const {name, tasks} = updateCategoryDto;

    category.name = name;

    if (tasks && tasks.length>0) {        
      category.tasks = await Promise.all(tasks.map(async taskId =>{
        const task = await this.taskRepository.findOne({where: {id: taskId}})
        return task;
      })) 
    }

    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
