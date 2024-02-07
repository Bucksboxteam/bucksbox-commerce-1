import { CustomerGroupRepository as MedusaCustomerGroupRepository } from "@medusajs/medusa/dist/repositories/customer-group";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { CustomerGroup } from "../models/customer-group";

export const CustomerGroupRepository = dataSource
  .getRepository(CustomerGroup)
  .extend(Object.assign(MedusaCustomerGroupRepository, { target: CustomerGroup }) );

export default CustomerGroupRepository;
