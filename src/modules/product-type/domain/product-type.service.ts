import { Injectable } from '@nestjs/common';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { IBatchResult } from 'src/base/interface/batch-result.interface';
import { ProductCategoryRepository } from 'src/modules/product-category/data/product-category.repository';
import { Connection } from 'typeorm';
import { CreateProductTypeDto } from '../controller/dto/create-product-type.dto';
import { ProductTypeGetManyDto } from '../controller/dto/product-type-get-many.dto';
import { UpdateProductTypeDto } from '../controller/dto/update-product-type.dto';
import { ProductTypeRepository } from '../data/product-type.repository';
import { IProductType } from './interface/product-type.interface';
import { ProductTypeCreate } from './use-case/product-type.create';
import { ProductTypeDelete } from './use-case/product-type.delete';
import { ProductTypeGetMany } from './use-case/product-type.get-many';
import { ProductTypeUpdate } from './use-case/product-type.update';

@Injectable()
export class ProductTypeService {
  constructor(
    private connection: Connection,
    private productTypeRepository: ProductTypeRepository,
    private productCategoryRepository: ProductCategoryRepository,
  ) {}

  async create(createProductTypeDto: CreateProductTypeDto) {
    const productTypeCreate = new ProductTypeCreate(
      this.connection,
      this.productTypeRepository,
      createProductTypeDto,
      this.productCategoryRepository,
    );
    await productTypeCreate.execute();
    return productTypeCreate.getResult();
  }

  async getMany(params: ProductTypeGetManyDto): Promise<Pagination<IProductType, IPaginationMeta>> {
    const productTypeGetMany = new ProductTypeGetMany(
      this.productTypeRepository,
      params,
    )
    await productTypeGetMany.execute();
    return productTypeGetMany.getResult();
  }

  async update(dataId: string, updateProductTypeDto: UpdateProductTypeDto): Promise<IProductType> {
    const productTypeUpdate = new ProductTypeUpdate(
      this.connection,
      this.productTypeRepository,
      dataId,
      updateProductTypeDto,
      this.productCategoryRepository,
    );
    await productTypeUpdate.execute();
    return productTypeUpdate.getResult();
  }

  async delete(id: string): Promise<IBatchResult> {
    const productTypeDelete = new ProductTypeDelete(
      this.connection,
      this.productTypeRepository,
      id
    );
    await productTypeDelete.execute();
    return productTypeDelete.getResult();
  }
}
