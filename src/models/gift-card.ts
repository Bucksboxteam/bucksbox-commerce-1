import { GiftCard as MedusaGiftCard } from "@medusajs/medusa";
import { Entity, ManyToOne, Column, Index, JoinColumn } from "typeorm";
import { Store } from "./store";


@Entity()
export class GiftCard extends MedusaGiftCard{

    @Index('GiftcardStoreId')
    @Column({nullable: true})
    store_id: string

    @ManyToOne(()=>Store, (store)=>store.giftCards)
    @JoinColumn({name: "store_id", referencedColumnName: "id"})
    store: Store
}