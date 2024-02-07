import { FindConfig, GiftCardService as MedusaGiftCardService, QuerySelector } from "@medusajs/medusa";
import {Lifetime} from 'awilix'
import { User } from "../models/user";
import { CreateGiftCardInput as MedusaCreateGiftCardInput } from "@medusajs/medusa/dist/types/gift-card";
import { GiftCard } from "../models/gift-card";

interface GCSelector extends GiftCard{

}

type CreateGiftCardInput = {
    store_id: string
} & MedusaCreateGiftCardInput

class GiftCardService extends MedusaGiftCardService{
    static readonly LIFETIME = Lifetime.SCOPED
    protected readonly loggedInUser_ : User | null

    constructor(container, options){
        // @ts-expect-error prefer-rest-params
        super(...arguments)

        try {
            this.loggedInUser_ = container.loggedInUser
        } catch (error) {
            
        }
    }
    async listAndCount(selector?: GCSelector, config?: FindConfig<GiftCard>): Promise<[GiftCard[], number]> {
        if(!selector?.store_id && this.loggedInUser_?.store_id){
            selector.store_id = this.loggedInUser_.store_id
        }

        return await super.listAndCount(selector, config)
    }

    async list(selector?:GCSelector, config?: FindConfig<GiftCard>): Promise<GiftCard[]> {
        if(!selector?.store_id && this.loggedInUser_?.store_id){
            selector.store_id = this.loggedInUser_.store_id
        }

        return await super.list(selector, config)
    }

    
    async create(giftCard: CreateGiftCardInput): Promise<GiftCard> {
        if(!giftCard?.store_id && this.loggedInUser_?.store_id){
            giftCard.store_id = this.loggedInUser_.store_id
        }

        return await super.create(giftCard)
    }
   
}

export default GiftCardService