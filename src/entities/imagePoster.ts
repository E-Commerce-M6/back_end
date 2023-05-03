import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Poster } from "./poster.entity";

@Entity("imagePoster")
export class ImagePoster {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Poster, (poster) => poster.images, { onDelete: "CASCADE" })
  poster: Poster;
}
