import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Department } from '../../departments/entities/department.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    unique: true,
  })
  employeeCode!: string;

  @Column({
    length: 100,
  })
  name!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    length: 20,
  })
  phone!: string;

  @Column({
    length: 100,
  })
  designation!: string;

  @ManyToOne(
  () => Department,
  {
    nullable: false,
  },
)
@JoinColumn({
  name: 'departmentId',
})
department!: Department;

  @Column({
    type: 'date',
  })
  joiningDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}