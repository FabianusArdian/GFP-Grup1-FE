import { products as serverProducts } from '../server/products';
import type { Product, ProductId } from '../server/types/product';

export { type Product, type ProductId };
export const products = serverProducts;