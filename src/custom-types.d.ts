
export declare module "@medusajs/medusa/dist/models/store"{
    declare interface Store{
        members: User[]
        products: Product[]
        orders: Order[]
        customers: Customer[]
        store_discounts: Discount[]
        giftCards: GiftCard[]
        rules: DiscountRule[]
        discount_conditions: DiscountCondition[]
        product_collections: ProductCollection[]
        categories: ProductCategory[]
        images: Image[]
    }
}

export declare module "@medusajs/medusa/dist/models/order"{
    declare interface Order{
        store_id:string
        store: Store
        order_parent_id:string
    }
}


export declare module "@medusajs/medusa/dist/models/user"{
    declare interface User{
        store_id:string
        store: Store
    }
}



export declare module "@medusajs/medusa/dist/models/product-category"{
    declare interface ProductCategory{
        store_id:string
        store: Store
    }
}





export declare module "@medusajs/medusa/dist/models/product"{
    declare interface Product{
        store_id:string
        store: Store
        reviews: ProductReview[]
    }
}
export declare module "@medusajs/medusa/dist/models/discount"{
    declare interface Discount{
        store_id:string
        store: Store
    }
}

export declare module "@medusajs/medusa/dist/models/product-review"{
    declare interface Discount{
        product_id:string
        product: Product
    }
}

export declare module "@medusajs/medusa/dist/models/gift-card"{
    declare interface GiftCard{
        store_id:string
        store: Store
    }
}

export declare module "@medusajs/medusa/dist/models/discount-rule"{
    declare interface DiscountRule{
        store_id:string
        store: Store
    }
}

export declare module "@medusajs/medusa/dist/models/image"{
    declare interface Image{
   
        stores: Store[]
    }
}

export declare module "@medusajs/medusa/dist/models/discount-condition"{
    declare interface DiscountCondition{
        store_id:string
        store: Store
    }
}

export declare module "@medusajs/medusa/dist/models/customer"{
    declare interface Customer{
        stores: Store[]
    }
}

export declare module "@medusajs/medusa/dist/models/customer-group"{
    declare interface CustomerGroup{
        store_id: string
        store: Store
    }
}

export declare module "@medusajs/medusa/dist/models/product-collection"{
    declare interface ProductCollection{
        store_id: string
        store: Store
    }
}






