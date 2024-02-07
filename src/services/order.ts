import {Lifetime} from "awilix"
import {  OrderService as MedusaOrderService, Order,  QuerySelector, User } from "@medusajs/medusa"
import { Selector , FindConfig } from "@medusajs/medusa"

interface OSelector extends Order{
    store_id: string
}

 class OrderService extends MedusaOrderService{
        static LIFE_TIME = Lifetime.SCOPED
        protected readonly loggedInUser_: User | null
       

        constructor(container, options){
             // @ts-expect-error prefer-rest-params
            super(...arguments)
            
            try {
                this.loggedInUser_ = container.loggedInUser
              } catch (e) {
                // avoid errors when backend first runs
              }
        }

        async list(selector: OSelector, config?: FindConfig<Order>): Promise<Order[]> {
            if(!selector.store_id && this.loggedInUser_.store_id){
                selector.store_id = this.loggedInUser_.store_id
            }
            config.select?.push('store_id')
            config.relations?.push('store')

            return await super.list(selector, config)
        }

        async listAndCount(selector: OSelector, config?: FindConfig<Order>): Promise<[Order[], number]> {
            if (!selector.store_id && this.loggedInUser_?.store_id) {
                selector.store_id = this.loggedInUser_.store_id
              }
          
              config.select?.push('store_id')
          
              config.relations?.push('store')
          
              return await super.listAndCount(selector, config)     
        }

        async retrieve(orderId: string, config?: FindConfig<Order>): Promise<Order> {
            console.log('--------------RETRIEVE METHOD CALLED-------------')
            
            const order = await super.retrieve(orderId, config)

            if(order.store?.id && this.loggedInUser_?.store_id && order.store.id !== this.loggedInUser_.store_id){
                throw new Error('Order does not exists in store')
            }
            return order
        }

        

       
        
        
        
}


export default OrderService