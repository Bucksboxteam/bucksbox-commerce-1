import { FindConfig, ProductCategoryService as  MedusaCategoryService, ProductCategory, QuerySelector, TreeQuerySelector } from "@medusajs/medusa";
import {Lifetime} from 'awilix'
import { User } from "../models/user";
import { CreateProductCategoryInput as MCI } from "@medusajs/medusa/dist/types/product-category";

type CreateProductCategoryInput = {
    store_id: string
} & MCI

class ProductCategoryService extends MedusaCategoryService{
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

    async create(productCategoryInput: CreateProductCategoryInput): Promise<ProductCategory> {
        console.log('Create category called');
        
        if(!productCategoryInput?.store_id && this.loggedInUser_?.store_id){
            productCategoryInput.store_id = this.loggedInUser_.store_id
        }

        return await super.create(productCategoryInput)
    }
    
}

export default ProductCategoryService