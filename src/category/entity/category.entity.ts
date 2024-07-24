// src/category/category.entity.ts
import { Product } from 'products/entity/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  products: Product[];
}
