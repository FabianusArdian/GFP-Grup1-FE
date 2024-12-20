import { sellers as serverSellers } from '../server/sellers';
import type { Seller, SellerId } from '../server/types/seller';

export { type Seller, type SellerId };
export const sellers = serverSellers;