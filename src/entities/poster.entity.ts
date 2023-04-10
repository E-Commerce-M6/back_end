import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column("decimal", { precision: 6, scale: 3 })
  kilometers: number;

  @Column({ length: 50 })
  color: String;

  @Column("integer")
  fipe_price: number;

  @Column()
  description: string;

  @Column({ default: false })
  is_published: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
