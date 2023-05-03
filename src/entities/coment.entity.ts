import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Poster } from './poster.entity';
import { User } from './user.entity';


@Entity("comment")
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Poster, poster => poster.comments, { onDelete: 'CASCADE' })
  poster: Poster;

  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;
}
