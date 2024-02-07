import { FindConfig, ProductCollectionService as MedusaCollectionService, Selector } from "@medusajs/medusa"
import {Lifetime} from 'awilix'
import { User } from "../models/user"
import { ProductCollection } from "../models/product-collection"
import { CreateProductCollection as MedusaCreateCollection } from "@medusajs/medusa/dist/types/product-collection"

interface PCSelector extends ProductCollection{

}

type CreateProductCollection = {
    store_id: string
} & MedusaCreateCollection

class ProductCollectionService extends MedusaCollectionService{

    static LIFETIME =  Lifetime.SCOPED
    protected readonly loggedInUser_: User | null

    constructor(container, options){
        // @ts-expect-error prefer-rest-params
        super(...arguments)

        try {
            this.loggedInUser_ = container.loggedInUser
        } catch (error) {
            
        }

    }

    async create(collection: CreateProductCollection): Promise<ProductCollection> {
        
        if(!collection?.store_id && this.loggedInUser_?.store_id){
            collection.store_id = this.loggedInUser_.store_id
        }

        const created_collection = await super.create(collection)
        console.log(created_collection);
        return created_collection
        
    }

    async listAndCount(selector?: PCSelector & { q?: string; discount_condition_id?: string; }, config?: FindConfig<ProductCollection>): Promise<[ProductCollection[], number]> {
        console.log('list and count called from product - collection');
        console.log(selector, selector?.store_id);
        
        if(!selector.hasOwnProperty("q")){
                return await super.listAndCount(selector, config)
        }

        if(!selector?.store_id && this.loggedInUser_.store_id){
            selector.store_id = this.loggedInUser_.store_id
        }

        return await super.listAndCount(selector, config)

    }

    async list(selector?: PCSelector & { q?: string; discount_condition_id?: string; }, config?: { skip: number; take: number; }): Promise<ProductCollection[]> {
        
        console.log('list called from product - collection');
        
        if(!selector?.store_id && this.loggedInUser_?.store_id){
            selector.store_id = this.loggedInUser_.store_id
        }

        return await super.list(selector, config)
    }

    async retrieve(collectionId: string, config?: FindConfig<ProductCollection>): Promise<ProductCollection> {
        console.log('log retrieve from product-collection');
        config = {
            
        }
        
        return await super.retrieve(collectionId, config)
    }

    async retrieveByHandle(collectionHandle: string, config?: FindConfig<ProductCollection>): Promise<ProductCollection> {
        
        console.log('Called retrieve by handle of product - handle');
        

        return await super.retrieveByHandle(collectionHandle, config)
    }

}

export default ProductCollectionService