import { PriceList as MedusaPriceList } from "@medusajs/medusa";
import { Entity, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { Store } from "./store";


@Entity()
export class PriceList extends MedusaPriceList{

    @Index("PriceListStoreId")
    @Column({nullable: true})
    store_id: string

    @ManyToOne(()=>Store, (store)=>store.price_lists)
    @JoinColumn({name: "store_id", referencedColumnName: "id"})
    store: Store
}