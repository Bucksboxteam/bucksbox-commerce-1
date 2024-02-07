import { Product } from "../models/product"
import { 
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import  {
  ProductRepository as MedusaProductRepository,
} from "@medusajs/medusa/dist/repositories/product"

export const ProductRepository = dataSource
  .getRepository(Product)
  .extend(
    // it is important to spread the existing repository here.
    //  Otherwise you will end up losing core properties
    Object.assign(MedusaProductRepository, { target: Product })

    /**
     * Here you can create your custom function
     * For example
     */
  
  )