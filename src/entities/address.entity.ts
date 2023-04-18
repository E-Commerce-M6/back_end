import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 8 })
  zip_code: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 127 })
  street: string;

  @Column({ length: 20,nullable: true })
  number?: string;

  @Column({ length: 127, nullable: true })
  complement?: string;

}
