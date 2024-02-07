
  import type { 
    MedusaNextFunction, 
    MedusaRequest, 
    MedusaResponse,
  } from "@medusajs/medusa"

import { UserService } from "@medusajs/medusa"
import {User} from '../../models/user'
import { dataSource } from "@medusajs/medusa/dist/loaders/database"


export async function registerLoggedInUser(req:MedusaRequest, res:MedusaResponse, next:MedusaNextFunction) {
  let loggedInUser: User | null = null

 if(req.headers["x-medusa-access-token"]){
  
  const api_token = req.headers["x-medusa-access-token"].toString()
  
    const loggedInUserRepo = dataSource.getRepository(User)
    loggedInUser = await loggedInUserRepo.findOne({where:{api_token: api_token}})
    
 }
  
  

  if (req.user && req.user.userId && !req.headers["x-medusa-access-token"]) {
      
      const userService = req.scope.resolve("userService") as UserService
      
      
      loggedInUser = await userService.retrieve(req.user.userId)
  }

  

  req.scope.register({
    loggedInUser: {
      resolve: () => loggedInUser,
     },
   })
  
  next()
}