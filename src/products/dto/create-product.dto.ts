// src/product/dto/create-product.dto.ts
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly local: string;

  @IsNumber()
  @IsOptional()
  readonly categories?: number;
}
