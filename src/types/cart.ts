import type { Product } from './product';

export interface CartItem extends Product {
  // We extend the base Product but make these specific fields mandatory 
  // because a user must choose them before adding to the bag.
  selectedSize: string;
  selectedColor: {
    name: string;
    hex: string;
  };
  quantity: number;
}