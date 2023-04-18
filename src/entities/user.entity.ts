import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Address } from "./address.entity";
import { Poster } from "./poster.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 127 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 127 })
  password: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ length: 13 })
  phone: string;

  @Column({ type: "date" })
  birth_date: string;

  @Column()
  description: string;

  @Column({ default: false })
  is_seller: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Address, (address) => address.user, { cascade: ["insert", "update"] })
  address: Address;

  @OneToMany(() => Poster, (poster) => poster.user)
  posters: Poster[];
}
