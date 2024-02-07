import { 
    type SubscriberConfig, 
    type SubscriberArgs,
    ShippingMethod,
    LineItem,
    Item,
  } from "@medusajs/medusa"
import ProductService from "../services/product" 
import { EntityManager } from "typeorm"
import { Order } from "../models/order"
import { Customer } from "../models/customer"
import OrderService  from "../services/order"
import CustomerService from "../services/customer"
import { Store } from "../models/store"


  export default async function handleOrderPlaced({ 
    data, eventName, container, pluginOptions, 
  }: SubscriberArgs<Record<string, string>>) {
    // TODO perform functionality
    
    //resolves the order service from the container
    const orderService: OrderService = container.resolve('orderService')
    
    //resolves the product service from the container
    const productService:ProductService = container.resolve('productService')

    const custmoerService: CustomerService = container.resolve('customerService')

    //resolves the manager to manage entities 
    const manager:EntityManager = container.resolve("manager")

    //using manager of type Entity manager to get the repository of the Order Entity
    const orderRepo = manager.getRepository(Order)
    const shippingMethodRepo = manager.getRepository(ShippingMethod)
    const lineItemsrepo = manager.getRepository(LineItem)
    const customerRepo = manager.getRepository(Customer)
    const storeRepo = manager.getRepository(Store)

    //retrieve order and relations using order.id
    const order = await orderService.retrieve(data.id, {relations:["items", "items.variant", "shipping_methods"]})
    
    let groupedItemsByStoreId = {}
    let email_count = 0
    for(let item of order.items){
      const product = await productService.retrieve(item.variant.product_id, {})
      const store_id = product.store_id
      

      
      
      if(!groupedItemsByStoreId.hasOwnProperty(store_id)){
          groupedItemsByStoreId[store_id] = []
      }

      groupedItemsByStoreId[store_id].push(item)
    }

   for(let store_id in groupedItemsByStoreId){
      
      const childOrder = orderRepo.create({
        ...order,
        order_parent_id: data.id,
        store_id: store_id,
        cart_id: null,
        cart: null,
        id: null,
        shipping_methods: []
      }) as Order

      const orderResult = await orderRepo.save(childOrder)
      console.log('shipping');
      console.log(`----------${orderResult.customer_id}----------`);
      
      // const customer = await customerRepo.findOneBy({id: orderResult.customer_id})
      const customer = await custmoerService.retrieve(orderResult.customer_id ,{relations: ['stores']})
      const store = await storeRepo.findOneBy({id: store_id})
      // console.log(customer, customer.stores);
      
      if(!customer.stores.find((s)=>s.id === store.id)){
        customer.stores.push(store)
        console.log('inside if');
        
      }else{
        console.log('Already a customer of this store');
      }
      console.log('customer above');
      
      
      
      
      
      await customerRepo.save(customer)

    
      
      
      

      // await customerRepo.save(updatedCustomer)
      
      // if(customer.store_id !== store_id){
      //   const newCustomer =  customerRepo.create({
      //     ...customer,
      //     store_id : store_id,
      //     id:null,
      //     email: `${email_count++}: ${customer.email}`
      //   })
      //   await customerRepo.save(newCustomer)

      // }else{
      //   console.log('Customer already exists in the store:'+store_id);
        
      // }

      for(let shipping_method of order.shipping_methods ){
        
        
        const newShippingMethod = shippingMethodRepo.create({
           ...shipping_method,
              id: null,
              cart_id: null,
              cart: null,
              order_id: orderResult.id

        })
        await shippingMethodRepo.save(newShippingMethod)
      }
      console.log('lineitems');
      
      const items: LineItem[] = groupedItemsByStoreId[store_id];
      for(let item of items){
        const newItem = lineItemsrepo.create({
          ...item,
          id: null,
              order_id: orderResult.id,
              cart_id: null
        })
        await lineItemsrepo.save(newItem)
      }
   }
    
   
    
    

  }
  
  export const config: SubscriberConfig = {
    event: OrderService.Events.PLACED,
    context: {
      subscriberId: "order-placed-handler",
    },
  }