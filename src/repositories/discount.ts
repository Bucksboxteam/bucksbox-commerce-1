import { Discount } from "../models/discount"
import { 
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import  {
  DiscountRepository as MedusaDiscountRepository,
} from "@medusajs/medusa/dist/repositories/discount"

export const DiscountRepository = dataSource
  .getRepository(Discount)
  .extend(
    Object.assign(
      MedusaDiscountRepository, 
      { target: Discount }
    ),
  )

export default DiscountRepository