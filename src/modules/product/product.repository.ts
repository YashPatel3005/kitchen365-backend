import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {
  Between,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Utils } from 'src/utils';
import { MESSAGES } from 'src/common/messages.constants';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    try {
      const createdProduct = this.productRepository.create(createProductDto);

      return await this.productRepository.save(createdProduct);
    } catch (error) {
      Utils.handleDatabaseError(error);
    }
  }

  async getAllProducts({ whereConditions, field, value, limit, page }) {
    try {
      const [products, total] = await this.productRepository.findAndCount({
        where: whereConditions,
        order: { [field]: value },
        take: limit,
        skip: (page - 1) * limit,
      });

      return {
        products,
        total,
        page,
        limit,
      };
    } catch (error) {
      Utils.handleDatabaseError(error);
    }
  }

  async getProductByName(name: string) {
    try {
      const product = await this.productRepository.findOneBy({
        name,
      });

      return product;
    } catch (error) {
      Utils.handleDatabaseError(error);
    }
  }

  async getProductById(id: string) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });

      return product;
    } catch (error) {
      Utils.handleDatabaseError(error);
    }
  }

  async deleteProductById(id: string) {
    try {
      return await this.productRepository.delete(id);
    } catch (error) {
      Utils.handleDatabaseError(error);
    }
  }
}
