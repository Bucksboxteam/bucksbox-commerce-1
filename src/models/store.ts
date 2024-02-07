import {Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne} from "typeorm"
import { Customer, Order, Product, User, Discount } from "@medusajs/medusa"
import { Image } from "./image"
import {Store as  MedusaStore} from '@medusajs/medusa'
import { GiftCard } from "./gift-card"
import { PriceList } from "./price-list"
import { CustomerGroup } from "./customer-group"
import { ProductCollection } from "./product-collection"
import { ProductCategory } from "./product-category"


@Entity()
export class Store extends MedusaStore{

    @Column()
    description: String

    @Column()
    store_image: String

    @OneToMany(()=>User, (user)=>user.store)
    members: User[]

    @OneToMany(()=>Product, (product)=> product.store)
    products: Product[]

    @OneToMany(()=>Order, (order)=>order.store)
    orders: Order[]

    @OneToMany(()=>Discount, (discount)=>discount.store)
    store_discounts: Discount[]

    @OneToMany(()=>GiftCard, (giftCard)=> giftCard.store)
    giftCards: GiftCard[]

    @OneToMany(()=>PriceList, (prieList)=>prieList.store)
    price_lists: PriceList[]

    @OneToMany(()=>CustomerGroup, (customer_group)=>customer_group.store_id)
    customer_groups: Customer[]

    @OneToMany(()=>ProductCollection, (product_c)=>product_c.store)
    product_collections: ProductCollection[]

    @OneToMany(()=>ProductCategory, (p_cat)=>p_cat.store)
    categories: ProductCategory[];
    
    @ManyToMany(()=>Customer, (customer)=>customer.stores)
    customers: Customer[];

    @ManyToMany(()=>Image, (image)=>image.stores)
    images: Image[];

    
   
}