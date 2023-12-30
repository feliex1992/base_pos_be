import { Injectable } from '@nestjs/common';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { IBatchResult } from 'src/base/interface/batch-result.interface';
import { ProductTypeRepository } from 'src/modules/product-type/data/product-type.repository';
import { UomRepository } from 'src/modules/uom/data/uom.repository';
import { Connection } from 'typeorm';
import { CreateProductDto } from '../controller/dto/create-product.dto';
import { ProductGetManyDto } from '../controller/dto/product-get-many.dto';
import { UpdateProductDto } from '../controller/dto/update-product.dto';
import { ProductCodeRepository } from '../data/product-code.repository';
import { ProductRepository } from '../data/product.repository';
import { IProduct } from './interface/product.interface';
import { ProductCreate } from './use-case/product.create';
import { ProductDelete } from './use-case/product.delete';
import { ProductGetLastCode } from './use-case/product.get-last-code';
import { ProductGetMany } from './use-case/product.get-many';
import { ProductUpdate } from './use-case/product.update';

@Injectable()
export class ProductService {
  constructor(
    private connection: Connection,
    private productRepository: ProductRepository,
    private productCodeRepository: ProductCodeRepository,
    private productTypeRepository: ProductTypeRepository,
    private uomRepository: UomRepository,
  ) {}

  async create(createDto: CreateProductDto) {
    const productCreate = new ProductCreate(
      this.connection,
      this.productRepository,
      createDto,
      this.productCodeRepository,
      this.productTypeRepository,
      this.uomRepository,
    );
    await productCreate.execute();
    return productCreate.getResult();
  }

  async getMany(params: ProductGetManyDto): Promise<Pagination<IProduct, IPaginationMeta>> {
    const productGetMany = new ProductGetMany(
      this.productRepository,
      params,
    )
    await productGetMany.execute();
    return productGetMany.getResult();
  }

  async update(dataId: string, updateDto: UpdateProductDto): Promise<IProduct> {
    const productUpdate = new ProductUpdate(
      this.connection,
      this.productRepository,
      dataId,
      updateDto,
      this.productCodeRepository,
      this.productTypeRepository,
      this.uomRepository,
    );
    await productUpdate.execute();
    return productUpdate.getResult();
  }

  async delete(id: string): Promise<IBatchResult> {
    const productDelete = new ProductDelete(
      this.connection,
      this.productRepository,
      id
    );
    await productDelete.execute();
    return productDelete.getResult();
  }

  async getLastCode(): Promise<{code: string}> {
    const productGetLastCode = new ProductGetLastCode(
      this.productRepository,
      this.productCodeRepository,
    )
    await productGetLastCode.execute();
    return productGetLastCode.getResult();
  }
}
