import {Lifetime} from 'awilix'
import {ExtendedFindConfig, FindConfig , CustomerService as MedusaCustomerService, ReturnItem, Selector} from '@medusajs/medusa'
import { Store } from '../models/store'
import { User } from '../models/user'
import { Customer } from '../models/customer'
import { CreateCustomerInput, UpdateCustomerInput as MedusaCustomerUpdateInput  } from '@medusajs/medusa/dist/types/customers'
import StoreRepository from '../repositories/store'
import { FindOptionsWhere } from 'typeorm'
import CustomerRepository from '../repositories/customer'




class CustomerService extends MedusaCustomerService{

    static readonly LIFETIME = Lifetime.SCOPED
    protected readonly loggedInUser_ : User | null
    protected readonly storeRepository_: typeof StoreRepository
    protected readonly customerRepository_: typeof CustomerRepository

    constructor(container, options){

        // @ts-expect-error prefer-rest-params
        super(...arguments)
        this.storeRepository_ = container.storeRepository
        this.customerRepository_ = container.customerRepository
        try {
            this.loggedInUser_ = container.loggedInUser
        } catch (error) {
            
        }
    }

    async list(selector?: Selector<Customer> & { q?: string; groups?: string[]; }, config?: FindConfig<Customer>): Promise<Customer[]> {
        console.log('List and count called');
        
        config?.relations?.push('stores')


        return await super.list(selector, config)
    }
    
    async listAndCount(selector: Selector<Customer> & { q?: string; groups?: string[]; }, config?: FindConfig<Customer>): Promise<[Customer[], number]> {
        // selector.q = "expand=groups"
        console.log('List and count called', selector)
        console.log('-----------------------------------Y');
        
        const customerRepo  =  this.manager_.withRepository(CustomerRepository)

        if(selector.groups){
            const customer_group_customer_list = await  customerRepo.find({
                select:{},
                relations: ["stores", "groups"],
                where:{
                    groups:{
                        id:selector.groups[0]
                    },
                    // stores:{
                    //     id:this.loggedInUser_.store_id
                    // }
                }
            })
            return [customer_group_customer_list, customer_group_customer_list.length]
        }

        const listCustomer = await customerRepo.find({
            select: {},
            relations: ['stores', 'groups'],
            where: {
                stores:{
                    id: this.loggedInUser_.store_id
                }
            }
        })

        return  [listCustomer, listCustomer.length]
    }
    async update(customerId: string, update: MedusaCustomerUpdateInput): Promise<Customer> {
        
        console.log('Update Called');
        

        return await super.update(customerId, update)
    }
    
    async create(customer: CreateCustomerInput): Promise<Customer> {
        console.log('Create Called');
        
        return await super.create(customer)
    }
    async delete(customerId: string): Promise<void | Customer> {
        console.log('Customer delete called');
        
        return await super.delete(customerId)
    }
    
}

export default CustomerService