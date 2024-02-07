import { Router, Request, Response } from "express";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import configLoader from "@medusajs/medusa/dist/loaders/config";
import { registerLoggedInUser } from "./middleware/logged-in-user";
import authenticate from "@medusajs/medusa/dist/api/middlewares/authenticate";
import cors from "cors";
import { Store } from "../models/store";
import { ProductCategory } from "../models/product-category";
import { Order } from "../models/order";
import { Discount } from "../models/discount";
import { Product } from "../models/product";
import { User } from "../models/user";
import { UserRoles, UserService } from "@medusajs/medusa";
import bodyParser from "body-parser";
import express from "express";
import { ProductCollection } from "../models/product-collection";
import { ProductReview } from "../models/product_review";
import { GiftCard } from "../models/gift-card";

import uploadImage from "./middleware/multer-middleware";
import { Image } from "../models/image";




interface MulterRequest extends Request{
  files: any
}


export default function (rootDirectory: string) {
  const router = Router();
  const config = configLoader(rootDirectory);

  router.use(express.json());
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(express.urlencoded({ extended: true }));

  const adminCors = {
    origin: config.projectConfig.admin_cors.split(","),
    credentials: true,
  };

  const storeCorsOptions = {
    origin: config.projectConfig.store_cors.split(","),
    credentials: false,
  };

  router.use(
    /\/admin\/[^(auth)].*/,
    cors(adminCors),
    authenticate(),
    registerLoggedInUser
  );

  //reviews
  // router.get(
  //   "/store/products/:id/reviews",
  //   cors(storeCorsOptions),
  //   (req, res) => {
  //     const productReviewService = req.scope.resolve("reviewService");
  //     productReviewService
  //       .getProductReviews(req.params.id)
  //       .then((product_reviews) => {
  //         return res.json({
  //           product_reviews,
  //         });
  //       });
  //   }
  // );

  //   router.options("/store/products/:id/reviews", cors(storeCorsOptions))
    router.post("/store/products/:id/reviews", async(req, res) => {
        // const productReviewService = req.scope.resolve("reviewService")
        
        // productReviewService.addProductReview(req.params.id, req.body.data).then((product_review) => {
        //   console.log(product_review);
        //     return res.json({
        //         product_review
        //     })
        // })
        const revRepo = dataSource.getRepository(ProductReview)

        const prod_rev = revRepo.create({
          product_id: req.params.id,
          title:req.body.title,
          full_name: req.body.full_name,
          content: req.body.content,
          rating: req.body.rating
        })

        const saved_prod_rev = await revRepo.save(prod_rev)

        if(saved_prod_rev){
          return res.json(prod_rev)
        }else{
          return res.json('Invalid Data')
        }

    })

    router.get('/product/:product_id/reviews', async(req, res)=>{
      const pRev = dataSource.getRepository(ProductReview)
      
      const reviews = await pRev.find({
        where:{
          product_id: req.params.product_id
        },
        relations: {
          product: true
        }
      })
      console.log(pRev, reviews);
      

      return res.json(reviews)

    })
//end reviews

  router.get("/wlcm", (req, res) => {
    return res.json({
      message: "Welcome to bucksbox",
    });
  });

  router.get("/user/store/:id", async (req, res) => {
    const store_repo = dataSource.getRepository(Store);
    const store = await store_repo.findOne({ where: {id: req.params.id}, relations: {currencies: true, images: true, members: true, }});

    return res.json(store);
  });

  router.get("/store/all-collections", async(req, res)=>{

    const collection_repo = dataSource.getRepository(ProductCollection)

    const collections = await collection_repo.find({
      relations: {
        store: true,
        products: {
          variants: {
            options: true,
            prices: true,
          },
          images: true,
        },
      },
    })

    return res.json({collections, count: collections.length})

  })

  router.get("/categories/:id", async (req, res) => {
    const category_repo = dataSource.getTreeRepository(ProductCategory);
    console.log(req.query);
    const all_categories = [];
    const categories = await category_repo.find({
      where: {
        store_id: req.params.id,
      },
      relations: {
        category_children: true,
        parent_category: true,
      },
    });

    if (categories.length > 0) {
      for (let category of categories) {
        if (category) {
          const cat_with_des_tree = await category_repo.findDescendantsTree(
            category
          );
          all_categories.push(cat_with_des_tree);
        }
      }
      return res.json(all_categories.filter((c) => !c.parent_category_id));
    } else {
      return res.json({
        error: `Category with store_id : ${req.params.id} does not exists`,
      });
    }
  });

  router.get("/orders/:store_id", async (req, res) => {
    const order_repo = dataSource.getRepository(Order);

    const orders = await order_repo.find({
      where: {
        store_id: req.params.store_id,
      },
      relations: {
        items: {
          variant: true,
        },
        customer: true,
        parent: true,
        store: true,
        shipping_methods: true,
      },
    });

    if (orders) {
      return res.json(orders);
    } else {
      return res.json({
        error: `No orders for store with store_id: ${req.params.store_id}`,
      });
    }
  });

  router.get("/discounts/:store_id", async (req, res) => {
    const discount_repo = dataSource.getRepository(Discount);

    const discounts = await discount_repo.find({
      where: {
        store_id: req.params.store_id,
      },
      relations: {
        rule: {
          conditions: true,
        },
        regions: true,
        store: true,
      },
    });

    

    if (discounts.length > 0) {
      return res.json({ discounts, count: discounts.length });
    } else {
      return res.json({
        error: `No discounts for store with store_id: ${req.params.store_id} `,
      });
    }
  });

  router.get("/giftcard/:store_id", async (req, res) => {
    const gc_repo = dataSource.getRepository(GiftCard);

    const gcs = await gc_repo.find({
      where: {
        store_id: req.params.store_id,
      },
      relations:{
        store: true,
        order: true,
        region: true,
      }
    });

    

    if (gcs.length > 0) {
      return res.json({ gcs, count: gcs.length });
    } else {
      return res.json({
        error: `No Gift-Carcds for store with store_id: ${req.params.store_id} `,
      });
    }
  });

  router.get("/product/:product_id", async (req, res) => {

    const product_repo = dataSource.getRepository(Product);

    const product = await product_repo.findOne({
      where: {
        id: req.params.product_id,
      },
      relations: {
        categories: req.query.show_categories === "true",
      },
    });

    if (!product)
      return res.json({
        error: `No Product or no categories for product with id ${req.params.product_id}`,
      });
    return res.json(product);
  });

  router.get("/products/:store_id", async (req, res) => {
    const product_repo = dataSource.getRepository(Product);

    const products = await product_repo.findAndCount({
      where: {
        store_id: req.params.store_id,
      },
      relations: {
        store: true,
        variants: {
          prices: true,
          options: true,
        },
        images: true,
      },
    });

    res.json(products);
  });


  router.post("/users/sign-up", uploadImage.fields([{name:"store_image", maxCount:1}, {name: "store_images",  maxCount:3}]),  async (req:MulterRequest, res) => {
    

    const user_repo = dataSource.getRepository(User);
    const store_repo = dataSource.getRepository(Store);
    const image_repo = dataSource.getRepository(Image)
    
    console.log(req.files.store_image[0].path);
    console.log(req.files);
    
    

    let store = store_repo.create({
      name: req.body.store_name,
      default_currency_code: "inr",
      description: req.body.description,
      store_image: req.files.store_image[0].location
    });

    for(let image of req.files.store_images){
      const d_image = new Image()
      d_image.url = image.location

      d_image.stores = [store]

      const saved_img = await image_repo.save(d_image)

      
      

    }
    
    const password = await UserService.prototype.hashPassword_(
      req.body.password
    );

    await store_repo.save(store);
    const user = user_repo.create();
    user.email = req.body.email;
    user.password_hash = password;
    user.store_id = store.id;
    user.role = UserRoles.MEMBER;
    user.api_token = ""
    await user_repo.save(user);

    return res.json(user);
  });

  router.get("/store/collections/:store_id", async (req, res) => {
    const collectionRepo = dataSource.getRepository(ProductCollection);
    const collections = await collectionRepo.find({
      where: {
        store_id: req.params.store_id,
      },
      relations: {
        store: true,
        products: {
          variants: {
            options: true,
            prices: true,
          },
          images: true,
        },
      },
    });

    if (collections.length > 0) {
      return res.json(collections);
    }

    return res.json(
      `No collection in store with store_id: ${req.params.store_id}`
    );
  });

  return router;
}
