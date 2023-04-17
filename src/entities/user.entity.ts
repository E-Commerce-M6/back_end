import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"

@Entity("user")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 127 })
    name: string;
    
    @Column({ length: 50 })
    email: string;

    @Column({ length: 127 })
    password: string;

    @Column({ length: 11 })
    cpf: string;

    @Column({ length: 13 })
    phone: string;

    @Column()
    birth_date: Date;

    @Column()
    description: string; 

    @Column({ default: false })
    is_seller: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date
}