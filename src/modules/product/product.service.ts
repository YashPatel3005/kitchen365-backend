import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dtos/create-product.dto';
import { MESSAGES } from 'src/common/messages.constants';
import { isValidPostgresUUID } from 'src/helpers/postgres.helper';
import { Between, ILike, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(createProductDto: CreateProductDto) {
    try {
      const doesProductAlreadyExist =
        await this.productRepository.getProductByName(createProductDto.name);

      if (doesProductAlreadyExist) {
        throw new BadRequestException(MESSAGES.ERROR.PRODUCT_ALREADY_EXISTS);
      }

      const product =
        await this.productRepository.createProduct(createProductDto);
      return product;
    } catch (error) {
      throw new Error(error.message || MESSAGES.ERROR.PRODUCT_CREATE_FAILED);
    }
  }

  async getAllProducts(query: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    minPrice?: string;
    maxPrice?: string;
  }) {
    try {
      let field: string, value: string | number;
      if (query.sortBy) {
        const parts = query.sortBy.split(':');
        field = parts[0];
        parts[1] === 'desc' ? (value = -1) : (value = 1);
      } else {
        (field = 'created_at'), (value = 1);
      }

      const pageOptions = {
        page: query.page ? query.page : 1,
        limit: query.limit || 10,
      };

      let page = pageOptions.page;
      let limit = pageOptions.limit;

      const whereConditions: Record<string, unknown> = {};

      if (query.search) {
        whereConditions.name = ILike(`%${query.search}%`);
      }

      if (query.minPrice && query.maxPrice) {
        whereConditions.price = Between(
          parseFloat(query.minPrice),
          parseFloat(query.maxPrice),
        );
      } else if (query.minPrice) {
        whereConditions.price = MoreThanOrEqual(parseFloat(query.minPrice));
      } else if (query.maxPrice) {
        whereConditions.price = LessThanOrEqual(parseFloat(query.maxPrice));
      }

      const products = await this.productRepository.getAllProducts({
        whereConditions,
        field,
        value,
        limit,
        page,
      });

      return products;
    } catch (error) {
      throw new Error(error.message || MESSAGES.ERROR.PRODUCT_FETCHED_FAILED);
    }
  }

  async deleteProductById(id: string) {
    try {
      const isValidId = isValidPostgresUUID(id);

      if (!isValidId) {
        throw new BadRequestException(MESSAGES.ERROR.INVALID_ID + id);
      }

      const doesProductExits = await this.productRepository.getProductById(id);

      if (!doesProductExits) {
        throw new NotFoundException(MESSAGES.ERROR.PRODUCT_NOT_FOUND);
      }

      const deletedProduct = await this.productRepository.deleteProductById(id);

      return deletedProduct;
    } catch (error) {
      throw new Error(error.message || MESSAGES.ERROR.PRODUCT_DELETE_FAILED);
    }
  }
}
