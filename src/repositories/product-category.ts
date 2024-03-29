import { ProductCategoryRepository as MedusaProductCategoryRepository } from "@medusajs/medusa/dist/repositories/product-category";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { ProductCategory } from "../models/product-category";

export const ProductCategoryRepository = dataSource
  .getTreeRepository(ProductCategory)
  .extend(Object.assign(MedusaProductCategoryRepository, { target: ProductCategory }) );

export default ProductCategoryRepository;
