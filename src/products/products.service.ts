// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { StrapiService } from '../strapi/strapi.service';
import { CreateProductDto } from './dto/create-product.dto';
import { prepareRelationForStrapi } from 'lib/utils/prepareRelationForStrapi';

@Injectable()
export class ProductService {
  constructor(private readonly strapiService: StrapiService) {}

  async create(createProductDto: CreateProductDto): Promise<any> {
    const preparedData = prepareRelationForStrapi({
      categories: {
        connect: createProductDto.categories,
      },
    });

    const productData = { ...createProductDto, ...preparedData };

    // Создание продукта в Strapi
    const strapiProduct = await this.strapiService.createEntry(
      'products',
      productData,
    );

    return strapiProduct;
  }

  async findAll(): Promise<any[]> {
    return this.strapiService.getEntries('products');
  }

  async findOne(id: number): Promise<any> {
    return this.strapiService.getEntry('products', id.toString());
  }

  async update(id: number, updateProductDto: CreateProductDto): Promise<any> {
    return this.strapiService.updateEntry(
      'products',
      id.toString(),
      updateProductDto,
    );
  }

  async remove(id: number): Promise<any> {
    return this.strapiService.deleteEntry('products', id.toString());
  }
}
