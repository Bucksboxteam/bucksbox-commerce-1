import { ProductCollection as MedusaProductCollection } from "@medusajs/medusa";
import { Entity, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { Store } from "./store";

@Entity()
export class ProductCollection extends MedusaProductCollection{

    @Index("ProductCollectionStoreId")
    @Column({nullable: true})
    store_id: string

    @ManyToOne(()=>Store, (store)=>store.product_collections)
    @JoinColumn({name: "store_id", referencedColumnName: "id"})
    store: Store
}