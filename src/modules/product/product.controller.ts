import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ROUTES } from 'src/common/routes.constants';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { MESSAGES } from 'src/common/messages.constants';
import { SuccessBuilder } from 'src/common/success-builder';

@Controller(ROUTES.PRODUCT.BASE)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await this.productService.createProduct(createProductDto);

      return SuccessBuilder(MESSAGES.SUCCESS.PRODUCT_CREATED, product);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('')
  async getAllProducts(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    try {
      const productList = await this.productService.getAllProducts({
        page,
        limit,
        search,
        sortBy,
        minPrice,
        maxPrice,
      });

      return SuccessBuilder(MESSAGES.SUCCESS.PRODUCT_FETCHED, productList);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    try {
      await this.productService.deleteProductById(id);

      return SuccessBuilder(MESSAGES.SUCCESS.PRODUCT_DELETED);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
