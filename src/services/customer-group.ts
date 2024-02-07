import { CustomerGroupService as MedusaCustomerGroupService, FindConfig, Selector,  } from "@medusajs/medusa";
import {Lifetime} from "awilix"
import { User } from "../models/user";
import { DeepPartial } from "typeorm";
import { CustomerGroup } from "../models/customer-group";
import { CustomerGroupUpdate } from "@medusajs/medusa/dist/types/customer-groups";

interface CSelector extends  CustomerGroup {
       
}

class CustomerGroupService extends MedusaCustomerGroupService{
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

    async create(group: DeepPartial<CustomerGroup>): Promise<CustomerGroup> {
        if(!group.store_id && this.loggedInUser_.store_id){
            group.store_id = this.loggedInUser_.store_id
        }

        return await super.create(group)
    }

    async list(selector: CSelector & { q?: string; discount_condition_id?: string; }, config: FindConfig<CustomerGroup>): Promise<CustomerGroup[]> {
        if(!selector.store_id && this.loggedInUser_.store_id){
            selector.store_id = this.loggedInUser_.store_id
            
        }


        return await super.list(selector, config)
    }

    async listAndCount(selector: Selector<CustomerGroup> & { q?: string; discount_condition_id?: string; }, config: FindConfig<CustomerGroup>): Promise<[CustomerGroup[], number]> {
        // if(!selector.store_id && this.loggedInUser_.store_id){
        //     selector.store_id = this.loggedInUser_.store_id
        //     selector.customers = ["cus_01HGXC9P8D1DR3H3Z4TD5PSRB5"]
        // }
        
        
        
        const customer_group = await super.listAndCount(selector, config)
        return customer_group
    }

    async update(customerGroupId: string, update: CustomerGroupUpdate): Promise<CustomerGroup> {
        console.log('Customer update group');

        return await super.update(customerGroupId, update) 
        
    }

    async delete(groupId: string): Promise<void> {
        console.log('delete called group');
        
        return await super.delete(groupId)

    }


}

export default CustomerGroupService