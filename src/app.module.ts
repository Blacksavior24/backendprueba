import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { CategoriesModule } from './tasks/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'notes',
      autoLoadEntities: true,
      synchronize: true
    }),
    TasksModule
  ],
})
export class AppModule {}
