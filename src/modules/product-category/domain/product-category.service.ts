import { Injectable } from '@nestjs/common';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { IBatchResult } from 'src/base/interface/batch-result.interface';
import { Connection } from 'typeorm';
import { CreateProductCategoryDto } from '../controller/dto/create-product-category.dto';
import { ProductCategoryGetManyDto } from '../controller/dto/product-category-get-many.dto';
import { UpdateProductCategoryDto } from '../controller/dto/update-product-category.dto';
import { ProductCategoryRepository } from '../data/product-category.repository';
import { IProductCategory } from './interface/product-category.interface';
import { ProductCategoryCreate } from './use-case/product-category.create';
import { ProductCategoryDelete } from './use-case/product-category.delete';
import { ProductCategoryGetMany } from './use-case/product-category.get-many';
import { ProductCategoryUpdate } from './use-case/product-category.update';

@Injectable()
export class ProductCategoryService {
  constructor(
    private connection: Connection,
    private productCategoryRepository: ProductCategoryRepository,
  ) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const productCategoryCreate = new ProductCategoryCreate(
      this.connection,
      this.productCategoryRepository,
      createProductCategoryDto
    );
    await productCategoryCreate.execute();
    return productCategoryCreate.getResult();
  }

  async getMany(params: ProductCategoryGetManyDto): Promise<Pagination<IProductCategory, IPaginationMeta>> {
    const productCategoryGetMany = new ProductCategoryGetMany(
      this.productCategoryRepository,
      params,
    )
    await productCategoryGetMany.execute();
    return productCategoryGetMany.getResult();
  }

  async update(dataId: string, updateProductCategoryDto: UpdateProductCategoryDto): Promise<IProductCategory> {
    const productCategoryUpdate = new ProductCategoryUpdate(
      this.connection,
      this.productCategoryRepository,
      dataId,
      updateProductCategoryDto
    );
    await productCategoryUpdate.execute();
    return productCategoryUpdate.getResult();
  }

  async delete(id: string): Promise<IBatchResult> {
    const productCategoryDelete = new ProductCategoryDelete(
      this.connection,
      this.productCategoryRepository,
      id
    );
    await productCategoryDelete.execute();
    return productCategoryDelete.getResult();
  }
}
