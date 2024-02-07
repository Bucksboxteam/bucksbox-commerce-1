import { FindConfig, DiscountService as MedusaDiscountService, DiscountRule,  MedusaContainer, DiscountConditionService, DiscountConditionOperator, DiscountRuleType } from "@medusajs/medusa";
import {Lifetime} from 'awilix'
import { User } from "../models/user";
import { Discount } from "../models/discount";
import { CreateDiscountRuleInput as MedusaCreateDiscountRuleInput, CreateDiscountInput as MedusaDiscountCreateInput, FilterableDiscountProps as MedusaFilterableDiscountProps } from "@medusajs/medusa/dist/types/discount";


type CreateDiscountRuleInput = {
    store_id: string
}  & MedusaCreateDiscountRuleInput

type CreateDiscountInput = {
    store_id: string,
    rule: CreateDiscountInput
} & MedusaDiscountCreateInput 

type FilterableDiscountProps = {
    store_id: string
} & MedusaFilterableDiscountProps

class DiscountService extends MedusaDiscountService{
    static LIFE_TIME = Lifetime.SCOPED
        protected readonly loggedInUser_: User | null
        protected readonly discountConditionService_: DiscountConditionService;

        constructor(container, options){
             // @ts-expect-error prefer-rest-params
            super(...arguments)
            
            this.discountConditionService_ = container.discountConditionService

            try {
                this.loggedInUser_ = container.loggedInUser
              } catch (e) {
                // avoid errors when backend first runs
              }
        }

        async create(discount: CreateDiscountInput): Promise<Discount> {
            console.log('Create method called');
            
            console.log(this.loggedInUser_.store_id);
            
            if(!discount.store_id && this.loggedInUser_.store_id){
                discount.store_id = this.loggedInUser_.store_id
            }


            const createdDiscount = await super.create(discount)
            

            return createdDiscount
        }
       

        async list(selector?: FilterableDiscountProps, config?: FindConfig<Discount>): Promise<Discount[]> {
            console.log('List Method Of Discount Is Called');
            
    
            if(!selector.store_id && this.loggedInUser_.store_id){
                selector.store_id = this.loggedInUser_.store_id
            }
    
            return await super.list(selector, config)
        }
    
        async listAndCount(selector?: FilterableDiscountProps, config?: FindConfig<Discount>): Promise<[Discount[], number]> {
            console.log('List And Count Method Of Discount Is Called');
    
            if(!selector.store_id && this.loggedInUser_.store_id){
                selector.store_id = this.loggedInUser_.store_id
            }
    
            return await super.listAndCount(selector, config)
            
        }
        async retrieve(discountId: string, config?: FindConfig<Discount>): Promise<Discount> {
            console.log('Retrieve called')

            return await super.retrieve(discountId, config)
        }

        
}

export default DiscountService