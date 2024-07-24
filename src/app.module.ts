import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { StrapiService } from './strapi/strapi.service';
import { StrapiModule } from './strapi/strapi.module';
import configuration from './config/configuration';
import { HttpModule } from '@nestjs/axios';
import { Product } from 'products/entity/product.entity';
import { Category } from 'category/entity/category.entity';
import { ProductModule } from 'products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [Product, Category], // Явно указываем сущности
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CategoryModule,
    ProductModule,
    StrapiModule,
    HttpModule,
  ],
  providers: [StrapiService],
})
export class AppModule {}
