import { Entity, Column, ManyToOne, TreeChildren, Tree, TreeParent, Index, JoinColumn } from "typeorm";
import { ProductCategory as MedusaProductCategory } from "@medusajs/medusa";
import { Store } from "./store";

@Entity()
@Tree("materialized-path")
export class ProductCategory extends MedusaProductCategory{
    @Index("ProductCategoryStoreId")
    @Column({nullable:true})
    store_id: string;

    @ManyToOne(()=>Store, (store)=>store.categories)
    @JoinColumn({name:"store_id", referencedColumnName: "id"})
    store: Store;

    @TreeParent()
    @JoinColumn({ name: "parent_category_id" })
    // @ts-ignore
    parent_category: ProductCategory | null;

    @TreeChildren({ cascade: true })
    // @ts-ignore
    category_children: ProductCategory[];
}