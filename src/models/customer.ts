import {Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany} from "typeorm"
import { Customer as MedusaCustomer, Store } from "@medusajs/medusa"

@Entity()
export class Customer extends MedusaCustomer{

    @ManyToMany(()=>Store, (store)=>store.customers, {cascade: true})
    @JoinTable({
        name: 'customer_stores_store',
        joinColumn: {
          name: 'customer_id'
        },
        inverseJoinColumn: {
          name: 'store_id'
        }
      })
    stores: Store[]
    
}