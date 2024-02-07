import { FilterablePriceListProps as MeusaFilterProps, FindConfig, CreatePriceListInput as MedusaCreatePriceListinput, PriceListService as MedusaPriceListService, PriceList } from "@medusajs/medusa";
import {Lifetime} from 'awilix'
import { User } from "../models/user";

type CreatePriceListInput = {
    store_id: string
} & MedusaCreatePriceListinput

type FilterablePriceListProps = {
    store_id: string
} & MeusaFilterProps

class PriceListService extends MedusaPriceListService {

    static LIFETIME = Lifetime.SCOPED
    protected readonly loggedInUser_ : User | null

    constructor(container, options){

        // @ts-expect-error prefer-rest-params
        super(...arguments)

        try {
            this.loggedInUser_ = container.loggedInUser
        } catch (error) {
            
        }
    }

    async create(priceListObject: CreatePriceListInput): Promise<PriceList> {
        if(!priceListObject?.store_id && this.loggedInUser_?.store_id){
            priceListObject.store_id = this.loggedInUser_.store_id
        }

        return await super.create(priceListObject)
    }
    async list(selector?: FilterablePriceListProps, config?: FindConfig<PriceList>): Promise<PriceList[]> {
        if(!selector?.store_id && this.loggedInUser_?.store_id){
            selector.store_id = this.loggedInUser_.store_id
        }

        return await super.list(selector, config)
    }
    
    
    async listAndCount(selector?: FilterablePriceListProps, config?: FindConfig<PriceList>): Promise<[PriceList[], number]> {
        if(!selector?.store_id && this.loggedInUser_?.store_id){
            selector.store_id = this.loggedInUser_.store_id
        }    

        return await super.listAndCount(selector, config)
    }

}

export default PriceListService