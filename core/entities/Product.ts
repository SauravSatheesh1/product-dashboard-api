import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(["sku"])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column({ unique: true })
  sku: string;

  @Column()
  description: string;
}
