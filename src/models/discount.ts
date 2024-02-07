import { Discount as MedusaDiscount, Store } from "@medusajs/medusa";
import { Entity, ManyToOne, Column, Index, JoinColumn, Relation } from "typeorm";


@Entity()
@Index("discount_storeid_code_unique_constraint", ["store", "code"], { where: "deleted_at IS NULL", })
export class Discount extends MedusaDiscount{

    @ManyToOne(() => Discount)
    @JoinColumn({ name: "parent_discount_id" })
    parent_discount: Discount;

    @Column({nullable:false})
    store_id: string

    @ManyToOne(()=>Store, (store)=>store.store_discounts)
    @JoinColumn({name: 'store_id', referencedColumnName: 'id'})
    store: Store

}