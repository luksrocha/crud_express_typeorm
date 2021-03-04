import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
class User {

  @PrimaryGeneratedColumn()
  readonly id: Number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @CreateDateColumn()
  created_at: Date;
}

export { User }