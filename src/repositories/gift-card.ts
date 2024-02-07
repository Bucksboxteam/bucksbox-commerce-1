import { GiftCard } from "../models/gift-card"
import { 
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import   {
  GiftCardRepository as MedusaGiftCardRepository,
} from "@medusajs/medusa/dist/repositories/gift-card"

export const GiftCardRepository = dataSource
  .getRepository(GiftCard)
  .extend(
    Object.assign(
      MedusaGiftCardRepository, 
      { target: GiftCard }
    ),
  )

export default GiftCardRepository