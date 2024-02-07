import { CustomerGroup as MedusaCustomerGroup } from "@medusajs/medusa";
import { Entity, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { Store } from "./store";

@Entity()
export class CustomerGroup extends MedusaCustomerGroup{

    @Index("CustomerGroupStoreId")
    @Column({nullable: true})
    store_id: string

    @ManyToOne(()=>Store, (store)=>store.customer_groups)
    @JoinColumn({name:"store_id", referencedColumnName: "id"})
    store: Store
}