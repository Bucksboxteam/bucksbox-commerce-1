import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import { Product } from "./product";
import {
  PrimaryGeneratedColumn,
  Index,
  Column,
  Entity,
  OneToMany,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class ProductReview extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: "int" })
  rating: string;

  @Index("ProductReviewProductId")
  @Column()
  product_id: string;

  @Column()
  full_name: string;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: "product_id", referencedColumnName: "id" })
  product: Product;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "prev")
  }

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;

  
}
