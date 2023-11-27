import { Task } from "src/tasks/entities/task.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, UpdateDateColumn, JoinTable } from "typeorm";

@Entity()
export class Category {

    @Column({primary:true, generated:true})
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToMany(()=> Task, (task)=> task.categories, {onDelete: 'CASCADE'})
    @JoinTable({
        name: 'tasks_categories',
        joinColumn:{
            name: 'category_id',
        },
        inverseJoinColumn:{
            name: 'task_id'
        },
    })
    tasks: Task[];

}
