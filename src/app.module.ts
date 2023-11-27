import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { CategoriesModule } from './tasks/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cli74vfjc5ks73eqkncg-a',
      port: 5432,
      username: 'db_crud_1j7b_user',
      password: 'SzaPxtqmL6lZYaId4lLrQFMIZ2bftgvU',
      database: 'db_crud_1j7b',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TasksModule
  ],
})
export class AppModule {}
