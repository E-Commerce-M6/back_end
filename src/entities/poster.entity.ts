import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ImagePoster } from "./imagePoster";
import { User } from "./user.entity";

export enum FuelType {
  DIESEL = "diesel",
  FLEX = "flex",
  HIBRIDO = "híbrido",
  ELETRICO = "elétrico",
}

@Entity("poster")
export class Poster {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  brand: string;

  @Column({ length: 50 })
  model: string;

  @Column({ length: 4 })
  year: string;

  @Column({
    type: "enum",
    enum: FuelType,
  })
  fuel_type: FuelType;

  @Column({ type: "numeric", default: 0 })
  kilometers: number;

  @Column({ length: 50 })
  color: String;

  @Column({ type: "decimal", precision: 9, scale: 2 })
  fipe_price: number;

  @Column({ type: "decimal", precision: 9, scale: 2, default: 0 })
  price: number;

  @Column()
  description: string;

  @Column({ default: false })
  is_published: boolean;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  user: User; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ImagePoster, (image) => image.poster)
  images: ImagePoster[];

  @AfterLoad() _convertNumerics(): void {
    this.kilometers = parseFloat(this.kilometers as any);
    this.fipe_price = parseFloat(this.fipe_price as any);
    this.price = parseFloat(this.price as any);
  }
}
