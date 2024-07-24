// src/category/category.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './entity/category.entity';
import { StrapiModule } from 'strapi/strapi.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), StrapiModule],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService, TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}
