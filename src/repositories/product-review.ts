import { ProductReview } from "../models/product_review";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const ProductReviewRepository = dataSource.getRepository(ProductReview)


export default ProductReviewRepository