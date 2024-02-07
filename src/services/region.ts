import { RegionService as MedusaRegionService, Region, User } from "@medusajs/medusa";
import { CreateRegionInput } from "@medusajs/medusa/dist/types/region";
import {Lifetime} from 'awilix'

class RegionService extends MedusaRegionService{
    static  LIFETIME = Lifetime.SCOPED
    protected readonly loggedInUser_ : User | null

    constructor(container, options) {
        // @ts-expect-error prefer-rest-params
        super(...arguments)
    
        try {
          this.loggedInUser_ = container.loggedInUser
        } catch (e) {
          // avoid errors when backend first runs
        }
      }

      async create(data: CreateRegionInput): Promise<Region> {
        console.log(data, 'inside creatae region');
        
          return super.create(data)
      }
      
}

export default RegionService