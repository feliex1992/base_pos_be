import { IProduct } from "../../domain/interface/product.interface";
import { UpdateProductDto } from "./update-product.dto";

export class CreateProductDto extends UpdateProductDto implements IProduct{}
