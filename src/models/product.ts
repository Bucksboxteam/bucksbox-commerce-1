import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany} from "typeorm"
import {Product as MedusaProduct} from '@medusajs/medusa'
import { Store } from "./store"
import { ProductReview } from "./product_review"

@Entity()
export class Product extends MedusaProduct{
    @Index("ProductStoreId")
    @Column({nullable: true})
    store_id: string

    @OneToMany(()=>ProductReview, (prodRev)=>prodRev.product_id)
    reviews: ProductReview[]

    @ManyToOne(()=>Store, (store)=>store.products)
    @JoinColumn({name: 'store_id', referencedColumnName: 'id'})
    store: Store
}