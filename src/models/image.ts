import {Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany} from "typeorm"
import { Image as MedusaImage } from "@medusajs/medusa"
import { Store } from "./store"

@Entity()
export class Image extends MedusaImage{
    @ManyToMany(()=>Store, (store)=>store.images, {cascade: true})
    @JoinTable({
        name: 'store_image_image',
        joinColumn: {
          name: 'image_id'
        },
        inverseJoinColumn: {
          name: 'store_id'
        }
      })
    stores: Store[]
}