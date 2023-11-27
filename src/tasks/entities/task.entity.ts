import { Category } from "src/tasks/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class Task {
    
    @Column({primary:true, generated:true})
    id: number;
    
    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column()
    active: boolean;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToMany(()=> Category, (category) => category.tasks, {onDelete: 'CASCADE'})
    @JoinTable({
         name: 'tasks_categories',
         joinColumn:{
            name: 'task_id',
         },
         inverseJoinColumn:{
             name: 'category_id'
         },
    })
    categories: Category[];
}
